<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TuteurCoursResource extends JsonResource
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
                'user_id' => $this->user_id,
                'cours_id' => $this->cours_id,
                'demande_accepte' => $this->demande_accepte
            ],
            'tuteur' => [
                'id' => (string)$this->tuteur->id,
                'email' => $this->tuteur->email,
                'prenom' => $this->tuteur->prenom,
                'nom' => $this->tuteur->nom,
                'role' => $this->tuteur->role,
            ],
            'cours' => [
                'id' => (string)$this->cours->id,
                'email' => $this->cours->numero,
                'prenom' => $this->cours->nom,
            ]
        ];
    }
}
