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
        'commentaireAisanceAide',
        'aisanceTuteur',
        'commentaireAisanceTuteur',
        'evaluationTuteur',
        'commentaireEvaluationTuteur',
        'noteProfesseur',
    ];

    public function jumelage()
    {
        return $this->belongsTo(cours::class, 'jumelage_id');
    }

}
