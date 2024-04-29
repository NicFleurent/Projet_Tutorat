<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecontresResource extends JsonResource
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
                'date' => $this->date,
                'heure' => $this->heure,
                'duree' => $this->duree
            ],
            'jumelage' => [
                'id' => (string)$this->jumelage->id,
                'journee' => $this->jumelage->journee,
                'heure' => $this->jumelage->heure,
                'cours_id' => $this->jumelage->cours_id,
                'tuteur_id' => $this->jumelage->tuteur_id,
                'aider_id' => $this->jumelage->aider_id,
                'tuteur' => [
                    'id' => (string)$this->jumelage->tuteur->id,
                    'email' => $this->jumelage->tuteur->email,
                    'prenom' => $this->jumelage->tuteur->prenom,
                    'nom' => $this->jumelage->tuteur->nom,
                    'role' => $this->jumelage->tuteur->role,
                ],
                'aide' => [
                    'id' => (string)$this->jumelage->aide->id,
                    'email' => $this->jumelage->aide->email,
                    'prenom' => $this->jumelage->aide->prenom,
                    'nom' => $this->jumelage->aide->nom,
                    'role' => $this->jumelage->aide->role,
                ],
                'cours' => [
                    'id' => (string)$this->jumelage->cours->id,
                    'numero' => $this->jumelage->cours->numero,
                    'nom' => $this->jumelage->cours->nom,
                ]
            ],
        ];
    }
}
