<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Utilisateur;

class UtilisateursController extends Controller
{
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
        
    }

    
    public function update(Request $request, string $id)
    {
        //
    }

    
    public function delete(string $id)
    {
        

    }
}
