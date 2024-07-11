<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('welcome', function() {
        return response()->json([
            "message" => "Welcome to Laravel API"
        ], 200);
    });

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']) -> name('api.login');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
    // Route::post('/check-token', [AuthController::class,'checkToken'])->name('auth.checkToken');


    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('products', ProductController::class);
        Route::apiResource('categories', CategoryController::class);
        // Route::apiResource('users', UserController::class) -> name('users','users');
        Route::get('/categories/{id}/products', [ProductController::class,'getProductsByCategory'])->name('products.category');
        Route::get('/categories/count', [CategoryController::class,'getCategoriesCount'])->name('categories.count');

        Route::post('/user/update-profile', [AuthController::class, 'updateProfile']);
        Route::post('/user/change-password', [AuthController::class, 'changePassword']);
    });

    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');



});

