<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GestionConnectionAdmin;


Route::get('/Laravel', function () {
    return view('welcome');
});


//Gestion de connection
Route::get('/', function () {return view('login');})->name('PageLogin');
Route::post('/Login', [GestionConnectionAdmin::class, 'Login'])->name('Login');
Route::post('/Logout',[GestionConnectionAdmin::class, 'Logout']);

//Gestion Utilisateur
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users', function () {return view('listUsers');})->name('listUsers');
});