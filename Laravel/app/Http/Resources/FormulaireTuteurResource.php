<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormulaireTuteurResource extends JsonResource
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
                'matiere_vu' => $this->matiere_vu,
                'note_aisance_aide' => $this->note_aisance_aide,
                'commentaire_aisance_aide' => $this->commentaire_aisance_aide,
                'note_aisance_tuteur' => $this->note_aisance_tuteur,
                'commentaire_aisance_tuteur' => $this->commentaire_aisance_tuteur,
                'note_evaluation' => $this->note_evaluation,
                'commentaire_evaluation' => $this->commentaire_evaluation,
                'commentaire_professeur' => $this->commentaire_professeur,
                'rencontre_id' => $this->programme_id,
            ]
        ];
    }
}
