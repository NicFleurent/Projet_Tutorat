<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DisponibilitesResource extends JsonResource
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
                'journee' => $this->journee,
                'heure' => $this->heure,
                'tuteur_id' => $this->user_id,
            ],
            'tuteur' => [
                'id' => (string)$this->tuteur->id,
                'nom' => $this->tuteur->nom,
                'prenom' => $this->tuteur->prenom         
            ]
        ];
    }
}
