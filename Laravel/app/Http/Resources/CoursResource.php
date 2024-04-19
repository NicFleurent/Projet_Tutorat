<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CoursResource extends JsonResource
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
                'numero' => $this->numero,
                'nom' => $this->nom,
                'responsable_id' => $this->responsable_id,
                'programme_id' => $this->programme_id,
            ],
            'responsable' => [
                'id' => (string)$this->responsable->id,
                'email' => $this->responsable->email,
                'prenom' => $this->responsable->prenom,
                'nom' => $this->responsable->nom,
                'role' => $this->responsable->role,
            ],
            'programme' => [
                'id' => (string)$this->programme->id,
                'numero' => $this->programme->numero,
                'nom' => $this->programme->nom,
            ]
        ];
    }
}
