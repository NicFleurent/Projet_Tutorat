<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'numero',
        'nom',
        'parent_id',
    ];

    public function parent()
    {
        return $this->belongsTo(Programme::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Programme::class, 'parent_id');
    }
}
