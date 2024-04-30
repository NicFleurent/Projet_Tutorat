<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RencontreRequest;
use App\Models\Rencontre;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Resources\RecontresResource;
use App\Models\Jumelage;
use App\Traits\RencontreTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
        $user_id = Auth::user()->id;

        $jumelages = Jumelage::where('tuteur_id', $user_id)
                                ->orWhere('aider_id', $user_id)
                                ->get();

        $idJumelages = [];

        foreach($jumelages as $jumelage){
            array_push($idJumelages, $jumelage->id);
        }
        
        $rencontres = Rencontre::whereIn('jumelage_id', $idJumelages)
                                ->whereDate('date', '>', Carbon::now())
                                ->orderBy('date')
                                ->limit(3)
                                ->get();
                                
        foreach ($rencontres as $rencontre) {
            $rencontre->heure = Carbon::parse($rencontre->heure)->format('H:i');
            $rencontre->date = Carbon::parse($rencontre->date)->locale('fr_FR')->isoFormat('LL');
        }

        return response()->json(RecontresResource::collection($rencontres), 200);
    }
}
