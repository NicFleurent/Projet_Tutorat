<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
                'content' => $this->content,
                'from' => $this->from_id,
                'to' => $this->to_id,
            ],
            'from' => [
                'id' => (string)$this->from->id,
                'email' => $this->from->email,
                'prenom' => $this->from->prenom,
                'nom' => $this->from->nom,
            ],
            'to' => [
                'id' => (string)$this->to->id,
                'email' => $this->to->email,
                'prenom' => $this->to->prenom,
                'nom' => $this->to->nom,
            ],
        ];
    }
}
