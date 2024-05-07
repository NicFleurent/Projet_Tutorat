<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GestionConnectionAdmin;
use App\Http\Controllers\GestionUtilisateursAdmin;
use App\Http\Controllers\GestionCoursAdmin;
use App\Http\Controllers\GestionProgrammeAdmin;
use App\Http\Controllers\GestionSessionAdmin;
use App\Http\Controllers\GestionJumelageAdmin;


Route::get('/Laravel', function () {
    return view('welcome');
});


Route::get('/', function () {return view('login');})->name('PageLogin');
Route::post('/Login', [GestionConnectionAdmin::class, 'Login'])->name('Login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users',[GestionUtilisateursAdmin::class, 'listUsers'])->name('listUsers');
    Route::get('/cours',[GestionCoursAdmin::class, 'listCours'])->name('listCours');
    Route::get('/programme',[GestionProgrammeAdmin::class, 'listProgramme'])->name('listProgramme');
    Route::get('/session',[GestionSessionAdmin::class, 'listSession'])->name('listSession');
    Route::get('/jumelage',[GestionJumelageAdmin::class, 'listJumelage'])->name('listJumelage');
    Route::post('/Logout',[GestionConnectionAdmin::class, 'Logout'])->name('Logout');
    Route::put('/users/desactiver/{id}',[GestionUtilisateursAdmin::class, 'desactiver'])->name('desactiverUser');
    Route::get('/user/{id}/edit',[GestionUtilisateursAdmin::class, 'editUser'])->name('editUser');
    Route::get('/cour/{id}/edit',[GestionCoursAdmin::class, 'editCour'])->name('editCour');
    Route::get('/programme/{id}/edit',[GestionProgrammeAdmin::class, 'editProgramme'])->name('editProgramme');
    Route::get('/session/{id}/edit',[GestionSessionAdmin::class, 'editSession'])->name('editSession');
    Route::get('/jumelage/{id}/edit',[GestionJumelageAdmin::class, 'editJumelage'])->name('editJumelage');
    Route::put('/user/{id}/update',[GestionUtilisateursAdmin::class, 'updateUser'])->name('updateUser');
    Route::put('/cour/{id}/update',[GestionCoursAdmin::class, 'updateCour'])->name('updateCour');
    Route::put('/programme/{id}/update',[GestionProgrammeAdmin::class, 'updateProgramme'])->name('updateProgramme');
    Route::put('/session/{id}/update',[GestionSessionAdmin::class, 'updateSession'])->name('updateSession');
    Route::put('/jumelage/{id}/update',[GestionJumelageAdmin::class, 'updateJumelage'])->name('updateJumelage');
});