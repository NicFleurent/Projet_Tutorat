<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RencontreRequest;
use App\Models\Rencontre;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Resources\RecontresResource;
use App\Traits\RencontreTrait;

class RencontresController extends Controller
{
    use HttpResponses;
    use RencontreTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rencontres = Rencontre::all();

        return response()->json($rencontres, 200);
    }

    public function store(RencontreRequest $request)
    {
        $response = $this->createRencontre($request);

        return $response;
    }

    public function prochainesRencontres()
    {
        /*$tuteurs = TuteurCours::where('cours_id',$idCours)
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
        }*/
        
        $rencontres = Rencontre::all();

        return response()->json(RecontresResource::collection($rencontres), 200);
    }
}
