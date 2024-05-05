<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDisponibiliteRequest;
use App\Http\Resources\DisponibilitesResource;
use Illuminate\Http\Request;
use App\Models\Disponibilite;
use App\Models\TuteurCours;
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
        foreach ($disponibilites as $dispo) {
            $dispo->heure = Carbon::parse($dispo->heure)->format('H:i');
        }
        return response()->json($disponibilites, 200);
    }

    public function indexDisponibilites($idCours)
    {
        $tuteurs = TuteurCours::where('cours_id',$idCours)
                              ->where('demande_accepte',1)->get();

        $idTuteurs = [];
        foreach($tuteurs as $tuteur)
        {
            array_push($idTuteurs, $tuteur->user_id);
        }
        
        $disponibilitesTuteur = Disponibilite::whereIn('user_id', $idTuteurs)
        ->orderBy('journee')
        ->orderBy('heure')
        ->get();
        foreach ($disponibilitesTuteur as $dispo) {
            $dispo->heure = Carbon::parse($dispo->heure)->format('H:i');
        }
  
      return response()->json(DisponibilitesResource::collection($disponibilitesTuteur), 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function upload(StoreDisponibiliteRequest $request)
    {
        $request->validated($request->all());

        $disponibilite = Disponibilite::create([
            'user_id' => $request->user_id,
            'journee' => $request->journee,
            'heure' => $request->heure
        ]);

        if ($disponibilite) {

            return response()->json([
                'message' => 'Disponibilité(s) ajoutée(s) avec succès.',
                'disponibilite' => new DisponibilitesResource($disponibilite)
            ], 200);
        } else {
            return response()->json(['message' => 'Échec de l\'ajout de la disponibilité'], 500);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Disponibilite $dispo)
    {
        $validator = Validator::make($request->all(), [
            'journee' => 'required',
            'heure' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        } else {
            $dispo->journee = $request->journee;
            $dispo->heure = $request->heure;
            $dispo->user_id = $request->user_id;
            $dispo->save();

            $dispoResource = new DisponibilitesResource($dispo);

            return response()->json([
                'message' => 'Disponibilité mise à jour réussie',
                'data' => $dispoResource,
            ], 200);
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
    public function delete(Disponibilite $dispo)
    {
        $dispo->delete();
        return response()->json([
            'message' => 'Disponibilité supprimée avec succès'
        ], 200);
    }
}
