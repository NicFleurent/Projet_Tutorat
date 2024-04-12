<?php

use App\Http\Controllers\CoursController;
use App\Http\Controllers\UtilisateursController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Cours
Route::get('cours', [CoursController::class, 'index']);







//Utilisateur
