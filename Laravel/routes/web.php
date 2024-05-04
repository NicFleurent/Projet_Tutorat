<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GestionConnectionAdmin;
use App\Http\Controllers\GestionUtilisateursAdmin;


Route::get('/Laravel', function () {
    return view('welcome');
});


Route::get('/', function () {return view('login');})->name('PageLogin');
Route::post('/Login', [GestionConnectionAdmin::class, 'Login'])->name('Login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users',[GestionUtilisateursAdmin::class, 'listUsers'])->name('listUsers');
    Route::post('/Logout',[GestionConnectionAdmin::class, 'Logout'])->name('Logout');
});