<?php

use App\Http\Controllers\CoursController;
use App\Http\Controllers\ProgrammesController;
use App\Http\Controllers\DisponibilitesController;
use App\Http\Controllers\JumelagesController;
use App\Http\Controllers\UtilisateursController;
use App\Http\Controllers\EmployesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Utilisateurs

Route::post('login', [UtilisateursController::class, 'login'])->name('login');
Route::post('register', [UtilisateursController::class, 'register']); 
Route::put('/utilisateurs/edit/{id}', [UtilisateursController::class, 'edit']);



Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [UtilisateursController::class, 'logout']);
    Route::put('/utilisateurs/updatePassword', [UtilisateursController::class, 'updatePassword']);
    Route::patch('/utilisateurs/desactiver', [UtilisateursController::class, 'desactiver']);
});


Route::get('/whoAmI', function() {      //Returns information sure personne auth
    return auth()->user();
})->middleware('auth:sanctum');


//Décommenter ou supprimer selon page admin (Voir controller)
//Route::get('/utilisateurs', [UtilisateursController::class, 'index']);


//Employes
Route::get('/employes', [EmployesController::class, 'index']);


//Cours
Route::get('cours', [CoursController::class, 'index']);
Route::post('cours/storeTuteur', [CoursController::class, 'storeTuteur']);


//Programmes
Route::get('programmes', [ProgrammesController::class, 'index']);
Route::get('programmes/{id}', [ProgrammesController::class, 'enfants']);


//Disponibilites
Route::get('disponibilites', [DisponibilitesController::class, 'index']);
Route::post('disponibilites/upload', [DisponibilitesController::class, 'upload']); 
Route::put('disponibilites/edit/{dispo}', [DisponibilitesController::class, 'edit']);
Route::delete('disponibilites/delete/{dispo}', [DisponibilitesController::class, 'delete']);



//Jumellages
Route::get('jumelages', [JumelagesController::class, 'index']);
