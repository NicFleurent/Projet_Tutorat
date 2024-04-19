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
                'email' => (string)$this->responsable->email,
                'prenom' => (string)$this->responsable->prenom,
                'nom' => (string)$this->responsable->nom,
                'role' => (string)$this->responsable->role,
            ],
            'programme' => [
                'id' => (string)$this->programme->id,
                'numero' => (string)$this->programme->numero,
                'nom' => (string)$this->programme->nom,
            ]
        ];
    }
}
