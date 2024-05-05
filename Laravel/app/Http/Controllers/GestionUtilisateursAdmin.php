<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class GestionUtilisateursAdmin extends Controller
{
    public function listUsers()
    {
        $users = User::all(); 

        return view('listUsers', compact('users'));
    }

}