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
            ],
        ];
    }
}
