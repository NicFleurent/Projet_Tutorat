<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JumelagesResource extends JsonResource
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
                'demande_accepte' => $this->demande_accepte
            ],
            'aide' => [
                'id' => (string)$this->aide->id,
                'email' => $this->aide->email,
                'prenom' => $this->aide->prenom,
                'nom' => $this->aide->nom,
                'role' => $this->aide->role,
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
                'numero' => $this->cours->numero,
                'nom' => $this->cours->nom,
            ]
        ];
    }
}
