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
        'id',
        'numero',
        'nom',
        'responsable_id',
    ];

    public function responsable()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function tuteurs()
    {
        return $this->belongsToMany(Utilisateur::class);
    }
}
