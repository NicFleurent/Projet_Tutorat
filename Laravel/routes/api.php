<?php

use App\Http\Controllers\CoursController;
use App\Http\Controllers\DisponibilitesController;
use App\Http\Controllers\UtilisateursController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('cours', [CoursController::class, 'index']);

Route::get('disponibilites', [DisponibilitesController::class, 'index']);
Route::post('disponibilites', [DisponibilitesController::class, 'store']);
#Route::put('disponibilites', [DisponibilitesController::class, 'edit']);
#Route::delete('disponibilites', [DisponibilitesController::class, 'delete']);

//Utilisateur
Route::get('/utilisateurs', [UtilisateursController::class, 'index']);
Route::post('/utilisateurs/upload', [UtilisateursController::class, 'upload']);
Route::put('/utilisateurs/edit/{id}', [UtilisateursController::class, 'edit']);
Route::delete('/utilisateurs/delete/{id}', [UtilisateursController::class, 'delete']);

