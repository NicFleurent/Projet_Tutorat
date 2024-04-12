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
Route::get('/utilisateurs', [UtilisateursController::class, 'index']);
Route::post('/utilisateurs/upload', [UtilisateursController::class, 'upload']);
Route::put('/utilisateurs/edit/{id}', [UtilisateursController::class, 'edit']);
Route::delete('/utilisateurs/delete/{id}', [UtilisateursController::class, 'delete']);