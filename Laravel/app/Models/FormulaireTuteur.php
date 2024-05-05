<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormulaireTuteur extends Model
{
    use HasFactory;

    protected $fillable= [
        'matiere_vu',
        'note_aisance_aide',
        'commentaire_aisance_aide',
        'note_aisance_tuteur',
        'commentaire_aisance_tuteur',
        'note_evaluation',
        'commentaire_evaluation',
        'commentaire_professeur',
        'rencontre_id'
    ];

    public function rencontre()
    {
        return $this->belongsTo(Rencontre::class, 'rencontre_id');
    }
}
