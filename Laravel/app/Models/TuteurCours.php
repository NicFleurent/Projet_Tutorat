<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TuteurCours extends Model
{
    protected $table = 'tuteur_cours';

    protected $fillable = [
        'user_id',
        'cours_id',
        'demande_accepte'
    ];

    public function tuteur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function cours()
    {
        return $this->belongsTo(Cours::class, 'cours_id');
    }
}
