<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskCategoryResource;
use App\Models\TaskCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class TaskCategoryController extends Controller{

    public function index(){
        $taskCategories = TaskCategory::with(['tasks' => function($query){
            $query->orderBy('id', 'desc');
        }])->get();
        return response(['data' => TaskCategoryResource::collection($taskCategories)], Response::HTTP_OK);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:task_categories,name|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->errors()
            ], 422);
        }

        $taskCategory = TaskCategory::create($request->all());
        return response([
            'message' =>'Task Category created successfully',
            'data'    => new TaskCategoryResource($taskCategory)
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $taskCategory = TaskCategory::find($id);

        if (empty($taskCategory)) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 400);
        }
        return response(['data' => new TaskCategoryResource($taskCategory)], Response::HTTP_OK);
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:task_categories,name,'.$id
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(['error' => $errors], 400);
        }

        $taskCategory = TaskCategory::find($id);

        if (empty($taskCategory)) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 400);
        }

        $taskCategory->update(['name'=> $request->input('name')]);

        return response([
            'message' => 'Task Category updated successfully',
            'data' => new TaskCategoryResource($taskCategory)
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $taskCategory = TaskCategory::find($id);

        if (empty($taskCategory)) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 400);
        }

        $taskCategory->delete();

        return response([
            'message' => 'Task Category deleted successfully',
        ], Response::HTTP_OK);

    }


}
