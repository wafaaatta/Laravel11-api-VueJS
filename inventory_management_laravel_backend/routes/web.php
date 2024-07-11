<?php

use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\DashboardController;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', [DashboardController::class, 'users'])->name('users');
    Route::get('/users/{id}/edit', [DashboardController::class, 'editUserView'])->name('users.edit');

});

