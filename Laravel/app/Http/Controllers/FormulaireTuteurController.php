<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFormulaireTuteurRequest;
use App\Http\Resources\FormulaireTuteurResource;
use App\Models\FormulaireTuteur;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class FormulaireTuteurController extends Controller
{
    use HttpResponses;

    public function store(StoreFormulaireTuteurRequest $request)
    {
        $request->validated($request->all());

        $formulaireTuteur = FormulaireTuteur::create([
            'matiere_vu' => $request->matiere_vu,
            'note_aisance_aide' => $request->note_aisance_aide,
            'commentaire_aisance_aide' => $request->commentaire_aisance_aide,
            'note_aisance_tuteur' => $request->note_aisance_tuteur,
            'commentaire_aisance_tuteur' => $request->commentaire_aisance_tuteur,
            'note_evaluation' => $request->note_evaluation,
            'commentaire_evaluation' => $request->commentaire_evaluation,
            'rencontre_id' => $request->rencontre_id,
        ]);

        $formulaireTuteur->save();

        return $this->success('', 'Le formulaire a été enregistré');
    }
}
