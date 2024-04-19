<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    /**
     * Table associée au modèle.
     * 
     * @var string
     */
    protected $table = 'cours';

    protected $fillable = [
        'numero',
        'nom',
        'responsable_id',
        'programme_id',
    ];

    public function responsable()
    {
        return $this->belongsTo(User::class);
    }

    public function tuteurs()
    {
        return $this->belongsToMany(User::class, 'tuteur_cours');
    }

    public function programme()
    {
        return $this->belongsTo(Programme::class);
    }
}
