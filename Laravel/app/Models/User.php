<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'prenom',
        'nom',
        'role',
        'email',
        'password',
        'activer',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function disponibilites(){
        return $this->hasMany(Disponibilite::class);
    }

    public function formulaireAides()
    {
        return $this->hasMany(FormulaireAide::class);
    }

    //public function jumelages()
    //{
    //    return $this->hasMany(Jumelage::class);
    //}

    public function jumelagesAsTuteur()
    {
        return $this->hasMany(Jumelage::class, 'tuteur_id');
    }

    public function jumelagesAsAider()
    {
        return $this->hasMany(Jumelage::class, 'aider_id');
    }
    
}
