<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GestionConnectionAdmin;
use App\Http\Controllers\GestionUtilisateursAdmin;
use App\Http\Controllers\GestionCoursAdmin;


Route::get('/Laravel', function () {
    return view('welcome');
});


Route::get('/', function () {return view('login');})->name('PageLogin');
Route::post('/Login', [GestionConnectionAdmin::class, 'Login'])->name('Login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users',[GestionUtilisateursAdmin::class, 'listUsers'])->name('listUsers');
    Route::get('/cours',[GestionCoursAdmin::class, 'listCours'])->name('listCours');
    Route::post('/Logout',[GestionConnectionAdmin::class, 'Logout'])->name('Logout');
    Route::put('/users/desactiver/{id}',[GestionUtilisateursAdmin::class, 'desactiver'])->name('desactiverUser');
    Route::get('/user/{id}/edit',[GestionUtilisateursAdmin::class, 'editUser'])->name('editUser');
    Route::get('/cour/{id}/edit',[GestionCoursAdmin::class, 'editCour'])->name('editCour');
    Route::put('/user/{id}/update',[GestionUtilisateursAdmin::class, 'updateUser'])->name('updateUser');
    Route::put('/cour/{id}/update',[GestionCoursAdmin::class, 'updateCour'])->name('updateCour');
});