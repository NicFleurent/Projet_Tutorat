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
    public function toArray($request)
    {
        return [
            'noDispo' => (string)$this->noDispo,
            'attributes' => [
                'journee' => $this->journee,
                'heure' => $this->heure,
                'utilisateur_id' => $this->utilisateur_id,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at
            ]

        ];
    }
}
