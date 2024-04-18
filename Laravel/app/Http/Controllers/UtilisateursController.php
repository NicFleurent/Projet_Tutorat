<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Utilisateur; //TODO : A enlever
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;

class UtilisateursController extends Controller
{
    use HttpResponses;

    

    public function login()
    {
        return "Login";
        /*LoginUserRequest $request
        $request->validated($request->all());

        if(!Auth::attempt($request->only('email','password'))){
            return $this->error('','Credentials do not match', 401);
        }
        
        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of '. $user->name)->plainTextToken
        ]);*/
    }

    public function register()
    {
        return response()->json('Register');
        /*LoginUserRequest $request
        $request->validated($request->all());

        if(!Auth::attempt($request->only('email','password'))){
            return $this->error('','Credentials do not match', 401);
        }
        
        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of '. $user->name)->plainTextToken
        ]);*/
    }

    public function logout()
    {
        return response()->json('logout');
        /*LoginUserRequest $request
        $request->validated($request->all());

        if(!Auth::attempt($request->only('email','password'))){
            return $this->error('','Credentials do not match', 401);
        }
        
        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of '. $user->name)->plainTextToken
        ]);*/
    }
    

    // TODO : Voir si necessaire
    public function index()
    {
        $utilisateur = Utilisateur::all();

        $data = [
            'status'=>200,
            'utilisateur'=>$utilisateur
        ];

        return response()->json($data, 200);
    }

    
    public function upload(Request $request)
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

    }
    
    public function edit(Request $request, $id)
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
    
    }

    public function delete($id)
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
    }
}
