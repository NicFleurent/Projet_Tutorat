<?php

use App\Http\Controllers\CoursController;
use App\Http\Controllers\ProgrammesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('cours', [CoursController::class, 'index']);

Route::get('programmes', [ProgrammesController::class, 'index']);
Route::get('programmes/{id}', [ProgrammesController::class, 'enfants']);