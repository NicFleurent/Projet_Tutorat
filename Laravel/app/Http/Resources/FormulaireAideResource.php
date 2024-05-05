<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormulaireAideResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string)$this->id,
            'attributes' => [
                'note_aisance_aide' => $this->aisanceAide,
                'commentaire_aisance_aide' => $this->commentaireAisanceAide,
                'note_aisance_tuteur' => $this->aisanceTuteur,
                'commentaire_aisance_tuteur' => $this->commentaireAisanceTuteur,
                'note_evaluation' => $this->evaluationTuteur,
                'commentaire_evaluation' => $this->commentaireEvaluationTuteur,
                'commentaire_professeur' => $this->noteProfesseur,
                'jumelage_id' => $this->jumelage_id,
            ],
            'jumelage'=> new JumelagesResource($this->jumelage)
        ];
    }
}
