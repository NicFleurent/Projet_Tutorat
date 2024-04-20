<?php

namespace App\Http\Controllers;

use App\Http\Requests\DisponibiliteRequest;
use App\Http\Requests\StoreDisponibiliteRequest;
use App\Http\Resources\DisponibilitesResource;
use Illuminate\Http\Request;
use App\Models\Disponibilite;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class DisponibilitesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $disponibilites = DisponibilitesResource::collection(Disponibilite::all());
        foreach ($disponibilites as $dispo){
            $dispo->heure = Carbon::parse($dispo->heure)->format('H:i');
        }
        return response()->json($disponibilites,200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function upload(StoreDisponibiliteRequest $request)
    {  
        $request->validated($request->all());

        $disponibilite = Disponibilite::create([
            'user_id' => $request ->user_id,
            'journee' => $request->journee,
            'heure' => $request->heure 
        ]);
        // $disponibilite = new Disponibilite;
        // $disponibilite->journee = $request->journee;
        // $disponibilite->heure = $request->heure;
        // $disponibilite->utilisateur_id = $request->utilisateur_id;
        // $disponibilite->save();

        //TODO: coder une réponse pour dire que l'ajout à fonctionnner ou non
        return new DisponibilitesResource($disponibilite);
        //return response()->json($disponibilite, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'journee' => 'required',
            'heure' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        else{
            $dispo = Disponibilite::findOrFail($id);
        
            $dispo->journee = $request->journee;
            $dispo->heure = $request->heure;
            $dispo->user_id = $request->user_id;
            $dispo->save();

            return response()->json(['message' => 'Disponibilité updated successfully'], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $disponibilites = Disponibilite::find($id);
        $disponibilites->deletee();
        return response()->json(null, 204);
    }
}
