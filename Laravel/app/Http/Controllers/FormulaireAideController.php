<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\FormulaireAide;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreFormAideRequest;

class FormulaireAideController extends Controller
{
    use HttpResponses;


    
    public function index()
    {
        //$formulaireAide = FormulaireAide::all();
        //return response()->json($formulaireAide, 200);
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

    public function teacherAddCommentAide(Request $request)
    {

    }

}
