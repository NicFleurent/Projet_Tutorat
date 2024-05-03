<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\LoginUserRequest;


class GestionConnectionAdmin extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return redirect()->route('PageLogin')->with('erreur', "Le courriel ou le mot de passe n'est pas valide");
        }

        $user = User::where('email', $request->email)->first();

        if ($user->activer === 1) {
            $token = $user->createToken('API Token of ' . $user->name)->plainTextToken;
            return redirect()->route('listUsers')->with('success', "Connexion réussie")->with('token', $token);
        } else {
            return redirect()->route('PageLogin')->with('erreur', "Compte désactivé");
        }
    }

    public function Logout()
    {
        Auth::guard('web')->logout();
        return redirect()->route('Netflix.home');
    }

}
