<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class UtilisateursController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if(!Auth::attempt($request->only('email','password'))){
            return $this->error('','Le courriel ou le mot de passe n\'est pas valide', 401);
        }
        
        $user = User::where('email', $request->email)->first();

        if ($user->activer === 1)
        {
            return $this->success([
                'user' => $user,
                'token' => $user->createToken('API Token of '. $user->name)->plainTextToken
            ]);
        }
        else{return $this->error('','compte desactiver', 401);}
       
    }

    public function register(StoreUserRequest $request)
    {
        $request->validated($request->all());

        $user = User::create([
            'email' => $request->email,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);


        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'Déconnecté et token supprimé'
        ]);
    }


    public function edit(Request $request)
    {
        $user = Auth::user();

        Log::info('User before update:', $user->toArray());

        $email = $request->input('email');

        if ($request->filled('email') && $request->email !== $user->email) {
            if(filter_var($email, FILTER_VALIDATE_EMAIL)){$user->email = $request->email;}
            else{return response()->json(['error' => 'Veuillez saisir un email valide'], 422);}
        }

        if ($request->filled('prenom') && $request->prenom !== $user->prenom) {
            $user->prenom = $request->prenom;
        }

        if ($request->filled('nom') && $request->nom !== $user->nom) {
            $user->nom = $request->nom;
        }

        if ($request->filled('role') && $request->role !== $user->role) {
            $validRoles = ['aider', 'admin', 'proffeseur', 'tuteur'];
            if (in_array($request->role, $validRoles)) {
                $user->role = $request->role;
            } else {
                return response()->json(['error' => 'Role incorrect'], 422);
            }
        }

        $user->save();

        Log::info('User updated:', $user->toArray());

        return response()->json(['message' => 'User updated successfully'], 200);
    }

    
    //"old_password"    //Log::info('User ID: ' . Auth::id());
    //"new_password"    //Log::info('Old Password Check: ' . Hash::check($request->old_password, Auth::user()->password));
    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['error' => 'Old password is incorrect'], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully'], 200);
        
    }

    // 1 activer, 0 desactiver
    public function desactiver(Request $request)
    {
        $user = Auth::user();
           
        $user->activer = "0";
        $user->save();

        $data = [
            'status'=>200,
            'message'=>'Desactiver Success'
        ];

        return response()->json($data,200);
    }
    
    

}
