<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AjoutComFormTuteurRequest;
use App\Http\Requests\StoreFormulaireTuteurRequest;
use App\Http\Resources\FormulaireTuteurResource;
use App\Models\Cours;
use App\Models\FormulaireTuteur;
use App\Models\Jumelage;
use App\Models\Rencontre;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FormulaireTuteurController extends Controller
{
    use HttpResponses;

    

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

            $rencontres_id = [];
            $rencontres = Rencontre::whereIn('jumelage_id', $jumelages_id)->get();
            foreach ($rencontres as $rencontre) {
                array_push($rencontres_id, $rencontre->id);
            }

            $formulaires = FormulaireTuteur::whereIn('rencontre_id', $rencontres_id)
                                            ->where('commentaire_professeur', 'Pas encore commenté')
                                            ->limit(3)
                                            ->get();

            return response()->json(FormulaireTuteurResource::collection($formulaires), 200);
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }

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

    public function ajoutCommentaire(AjoutComFormTuteurRequest $request, string $id)
    {
        $request->validated($request->all());

        try {
            $formulaire = FormulaireTuteur::findOrFail($id);

            $formulaire->commentaire_professeur = $request->commentaire_professeur;
            $formulaire->save();

            return $this->success($formulaire, 'Les commentaires ont été ajoutés');

        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }
}
