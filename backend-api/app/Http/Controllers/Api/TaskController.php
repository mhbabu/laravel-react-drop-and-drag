<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller{

    public function index(){

        $tasks = Task::orderBy('id', 'desc')->all();

        if ($tasks->count() == 0) {
            return response()->json(['data' => []], 404);
        }

        $data = TaskResource::collection($tasks);
        return response(['data' => $data], Response::HTTP_OK);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name'         => 'required|string|max:255',
            'category_id'  => ['required', 'exists:task_categories,id'],
        ],[],[
            'category_id' => 'task category'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(['error' => $errors], 422);
        }

        $task = Task::create([
            'category_id' => $request->input('category_id'),
            'name' => $request->input('name')
        ]);

        return response(['message' =>'Task created successfully','data' => $task], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (empty($task)) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 400);
        }
        return response(['data' => new TaskResource($task)], Response::HTTP_OK);
    }

    public function update(Request $request, Task $task)
    {
        $validator = Validator::make($request->all(), [
            'name'         => 'required|string|max:255',
            'category_id'  => ['required', 'exists:task_categories,id'],
        ],[],[
            'category_id' => 'task category'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(['error' => $errors], 400);
        }

        if (empty($task)) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 400);
        }

        $task->update(['name'=> $request->input('name'), 'category_id' => $request->input('category_id')]);

        return response([
            'message' => 'Task Category updated successfully',
            'data' => new TaskResource($task)
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (empty($task)) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 400);
        }

        $task->delete();

        return response([
            'message' => 'Task deleted successfully',
        ], Response::HTTP_OK);

    }

    public function taskAssign(Request $request){

        $validator = Validator::make($request->all(), [
            'task_id'  => 'required|exists:tasks,id',
            'users'    => 'required|array|distinct',
            'users.*'  => 'required|exists:users,id'
        ],[],[
            'task_id' => 'task'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(['error' => $errors], 422);
        }
        $task = Task::find($request->task_id);
        $task->users()->sync($request->users);

        return response([
            'message' => 'User assigned successfully',
        ], Response::HTTP_OK);
    }

    public function taskUsers(Task $task)
    {
       $users = $task->users->map(function ($user) {
            return [
                "value" => $user->id,
                "label" => $user->name
            ];
        });

        return response()->json(['data' => $users], Response::HTTP_OK);
    }


}
