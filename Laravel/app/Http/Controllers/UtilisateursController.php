<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\EditUserPassword;
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

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of '. $user->name)->plainTextToken
        ]);
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
    
    public function edit(Request $request, $id) //edited
    {
        
        Log::info('Edit request received.', ['id' => $id, 'request_data' => $request->all()]);

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'prenom' => 'required',
            'nom' => 'required',
            'role' => 'required'
        ]);

        if ($validator->fails()) {
            
            Log::error('Validation failed:', ['errors' => $validator->errors()]);
            return response()->json(['error' => $validator->errors()], 422);
        } else {
            $user = User::findOrFail($id);

            
            Log::info('User before update:', $user->toArray());

            $user->email = $request->email;
            $user->prenom = $request->prenom;
            $user->nom = $request->nom;
            $user->role = $request->role;

            $user->save();

            
            Log::info('User updated:', $user->toArray());

            return response()->json(['message' => 'User updated successfully'], 200);
        }
    }


    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['error' => 'Old password is incorrect'], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully'], 200);
    }





    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
            
        $data = [
            'status'=>200,
            'message'=>'Delete Success'
        ];

        return response()->json($data,200);
    }
    
    // TODO : Voir si necessaire
    /*public function index()
    {
        $utilisateur = Utilisateur::all();

        $data = [
            'status'=>200,
            'utilisateur'=>$utilisateur
        ];

        return response()->json($data, 200);
    }*/

}
