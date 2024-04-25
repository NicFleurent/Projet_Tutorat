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
    ];
}
