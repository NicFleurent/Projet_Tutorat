<?php

use App\Http\Controllers\CoursController;
use App\Http\Controllers\ProgrammesController;
use App\Http\Controllers\DisponibilitesController;
use App\Http\Controllers\JumelagesController;
use App\Http\Controllers\UtilisateursController;
use App\Http\Controllers\EmployesController;
use App\Http\Controllers\RencontresController;
use App\Http\Controllers\SessionDureeController;
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
    Route::get('cours/demandeAttente', [CoursController::class, 'demandeAttente']);
    Route::patch('cours/acceptTuteurCours/{id}', [CoursController::class, 'acceptTuteurCours']);
    Route::delete('cours/refuseTuteurCours/{id}', [CoursController::class, 'refuseTuteurCours']);
    Route::get('jumelages/demandeAttente', [JumelagesController::class, 'demandeAttente']);
    Route::patch('jumelages/acceptJumelage/{id}', [JumelagesController::class, 'acceptJumelage']);
    Route::delete('jumelages/refuseJumelage/{id}', [JumelagesController::class, 'refuseJumelage']);
});


Route::get('/whoAmI', function () {      //Returns information sure personne auth
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


//Disponibilites
Route::get('disponibilites', [DisponibilitesController::class, 'index']);
Route::post('disponibilites/upload', [DisponibilitesController::class, 'upload']);
Route::put('disponibilites/edit/{dispo}', [DisponibilitesController::class, 'edit']);
Route::delete('disponibilites/delete/{dispo}', [DisponibilitesController::class, 'delete']);



//Jumellages
Route::get('jumelages', [JumelagesController::class, 'index']);
Route::post('jumelage/create', [JumelagesController::class, 'store']);
Route::post('jumelage/accepte/{id}', [JumelagesController::class, 'acceptJumelage']);
Route::post('jumelage/refuse/{id}', [JumelagesController::class, 'refuseJumelage']);

//Rencontres
Route::get('rencontres', [RencontresController::class, 'index']);
Route::post('rencontres/create  ', [RencontresController::class, 'store']);

//SessionDuree

Route::get('session', [SessionDureeController::class, 'index']);
