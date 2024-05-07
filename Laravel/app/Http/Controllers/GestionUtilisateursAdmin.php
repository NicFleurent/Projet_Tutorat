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

    public function desactiver($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur pas trouvé.'], 404);
        }

        $user->update(['activer' => false]);

        return response()->json(['message' => 'Utilisateur désactiver.']);
    }

    public function editUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return redirect()->back()->with('error', 'Utilisateur pas trouvé.');
        }
        return view('editUser', compact('user'));
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return redirect()->back()->with('error', 'Utilisateur pas trouvé.');
        }

        $validatedData = $request->validate([
            'prenom'   => 'sometimes|required|string|max:100',
            'nom'      => 'sometimes|required|string|max:100',
            'email'    => 'sometimes|required|string|email|max:255',
            'role'     => 'sometimes|required|string',
            'password' => 'nullable|string', 
            'activer'  => 'required|boolean',
        ]);

        if ($validatedData['activer'] === '0') {
            $user->update(['activer' => '0']);
        }

        $user->fill(array_filter($validatedData))->save();

        return redirect()->route('listUsers')->with('success', 'Utilisateur modifié.');
    }


}
