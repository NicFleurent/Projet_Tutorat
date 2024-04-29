<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rencontre extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'heure',
        'duree',
        'jumelage_id'
    ];

    public function jumelage()
    {
        return $this->belongsTo(jumelage::class, 'jumelage_id');
    }
}
