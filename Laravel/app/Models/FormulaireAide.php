<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormulaireAide extends Model
{
    use HasFactory;

    protected $fillable= [
        'jumelage_id',
        'aisanceAide',
        'aisanceTuteur',
        'evaluationTuteur',
        'commentaire',
        'noteProfesseur',
    ];

    public function jumelage()
    {
        return $this->belongsTo(cours::class, 'jumelage_id');
    }

}
