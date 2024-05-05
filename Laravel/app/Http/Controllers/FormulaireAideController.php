<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\FormulaireAide;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreFormAideRequest;
use App\Http\Resources\FormulaireAideResource;
use App\Models\Cours;
use App\Models\Jumelage;

class FormulaireAideController extends Controller
{
    use HttpResponses;


    
    public function index()
    {
        //$formulaireAide = FormulaireAide::all();
        //return response()->json($formulaireAide, 200);
    }

    public function sansCommentaire()
    {
        $user_id = Auth::user()->id;

        try {
            $cours_id = [];
            $cours = Cours::where('responsable_id', $user_id)->get();
            foreach ($cours as $cour) {
                array_push($cours_id, $cour->id);
            }

            $jumelages_id = [];
            $jumelages = Jumelage::whereIn('cours_id', $cours_id)->get();
            foreach ($jumelages as $jumelage) {
                array_push($jumelages_id, $jumelage->id);
            }

            $formulaires = FormulaireAide::whereIn('jumelage_id', $jumelages_id)
                                            ->where('noteProfesseur', 'Pas encore commenté')
                                            ->get();

            return response()->json(FormulaireAideResource::collection($formulaires), 200);
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }

    public function store(StoreFormAideRequest $request)
    {
        Log::info($request->validated($request->all()));

        $formulaireAide = FormulaireAide::create([
            'jumelage_id' => $request->jumelage_id,
            'aisanceAide' => $request->aisanceAide,
            'commentaireAisanceAide' => $request->commentaireAisanceAide,
            'aisanceTuteur' => $request->aisanceTuteur,
            'commentaireAisanceTuteur' => $request->commentaireAisanceTuteur,
            'evaluationTuteur' => $request->evaluationTuteur,
            'commentaireEvaluationTuteur' => $request->commentaireEvaluationTuteur
        ]);

        $formulaireAide->save();

        return $this->success('', 'Le formulaire a été enregistré');

    }

    public function ajoutCommentaire(Request $request)
    {
        
    }

}
