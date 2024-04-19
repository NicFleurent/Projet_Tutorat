<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


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
        //L'erreur est normale, elle n'empeche pas le fonctionnement
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'Déconnecté et token supprimé'
        ]);
    }
    
    public function edit(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required',
        'prenom' => 'required',
        'nom' => 'required',
        'role' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 422);
    }

    $user = User::findOrFail($id);
    
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->prenom = $request->prenom;
    $user->nom = $request->nom;
    $user->role = $request->role;

    $user->save();

    return response()->json(['message' => 'User updated successfully'], 200);
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

    
    /*public function upload(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'email'=>'required|email',
            'mot_passe'=>'required',
            'prenom'=>'required',
            'nom'=>'required',
            'role'=>'required'
        ]);

        if($validator->fails()){
            $data=[
                'status'=>422,
                'message'=>'Upload Failed'
            ];
            return response()->json($data,422);
        }
        else
        {
            $utilisateur = new Utilisateur;
            $utilisateur->email = $request->email;
            $utilisateur->mot_passe = $request->mot_passe;
            $utilisateur->prenom = $request->prenom;
            $utilisateur->nom = $request->nom;
            $utilisateur->role = $request->role;

            $utilisateur->save();

            $data = [
                'status' =>200,
                'message'=> 'Upload Sucess'
            ];

            return response()->json($data,200);
        }

    }*/
    
    /*public function edit(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'mot_passe' => 'required',
            'prenom' => 'required',
            'nom' => 'required',
            'role' => 'required'
        ]);
    
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => 'Validation Failed'
            ];
            return response()->json($data, 422);
        }
        else
        {
            $utilisateur = Utilisateur::find($id);
            if (!$utilisateur) {
                $data = [
                    'status' => 404,
                    'message' => 'User not found'
                ];
                return response()->json($data, 404);
            }
            else
            {
                $utilisateur->email = $request->email;
                $utilisateur->mot_passe = $request->mot_passe;
                $utilisateur->prenom = $request->prenom;
                $utilisateur->nom = $request->nom;
                $utilisateur->role = $request->role;

                $utilisateur->save();

                $data = [
                    'status' => 200,
                    'message' => 'User Success'
                ];

                return response()->json($data, 200);
            }
        }
    
    }*/

    /*public function delete($id)
    {
        $utilisateur = Utilisateur::find($id);
        if (!$utilisateur) {
            $data = [
                'status' => 404,
                'message' => 'User not found'
            ];
            return response()->json($data, 404);
        }
        else
        {
            $utilisateur->delete();
            
            $data = [
                'status'=>200,
                'message'=>'Delete Success'
            ];

            return response()->json($data,200);
        }
    }*/
}
