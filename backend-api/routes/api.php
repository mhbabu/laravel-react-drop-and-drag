<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskCategoryController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('user')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::prefix('auth-user')->middleware('auth:sanctum')->group( function () {
    Route::get('list', [AuthController::class, 'userList']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::resource('task-categories', TaskCategoryController::class);
    Route::resource('tasks', TaskController::class);

});
