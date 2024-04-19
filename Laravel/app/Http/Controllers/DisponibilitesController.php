<?php

namespace App\Http\Controllers;

use App\Http\Requests\DisponibiliteRequest;
use Illuminate\Http\Request;
use App\Models\Disponibilite;
use Carbon\Carbon;

class DisponibilitesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $disponibilites = Disponibilite::all();
        foreach ($disponibilites as $dispo){
            $dispo->heure = Carbon::parse($dispo->heure)->format('H:i');
        }
        return response()->json($disponibilites,200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function upload(DisponibiliteRequest $request)
    {  
        $disponibilite = new Disponibilite;
        $disponibilite->journee = $request->journee;
        $disponibilite->heure = $request->heure;
        $disponibilite->utilisateur_id = $request->utilisateur_id;
        $disponibilite->save();

        //TODO: coder une réponse pour dire que l'ajout à fonctionnner ou non

        return response()->json($disponibilite, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DisponibiliteRequest $request, $id)
    {
        $disponibilite = Disponibilite::findOrFail($id);
        $disponibilite->journee = $request->journee;
        $disponibilite->heure = $disponibilite->heure = $request->heure;
        $disponibilite->utilisateur_id = $request->utilisateur_id;
        $disponibilite->save();
        return response()->json($disponibilite, 200);
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
