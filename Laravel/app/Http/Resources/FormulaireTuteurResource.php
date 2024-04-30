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
                'matiere_vu' => $this->numero,
                'note_aisance_aide' => $this->nom,
                'commentaire_aisance_aide' => $this->responsable_id,
                'note_aisance_tuteur' => $this->programme_id,
                'commentaire_aisance_tuteur' => $this->programme_id,
                'note_evaluation' => $this->programme_id,
                'commentaire_evaluation' => $this->programme_id,
                'commentaire_professeur' => $this->programme_id,
                'rencontre_id' => $this->programme_id,
            ]
        ];
    }
}
