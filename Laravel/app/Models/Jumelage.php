<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jumelage extends Model
{
    use HasFactory;

    protected $fillable = [
        'journee',
        'heure',
        'demande_accepte',
        'cours_id',
        'tuteur_id',
        'aider_id',
    ];

    public function tuteur()
    {
        return $this->belongsTo(User::class, 'tuteur_id');
    }

    public function aider()
    {
        return $this->belongsTo(User::class, 'aider_id');
    }

    public function cours()
    {
        return $this->belongsTo(cours::class, 'cours_id');
    }
}
