<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UtilisateursTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('utilisateurs')->insert([
            [
                'email' => 'user@hotmail.ca',
                'mot_passe' => 'user',
                'prenom' => 'User',
                'nom' => 'User',
            ],
            [
                'email' => 'admin@hotmail.ca',
                'mot_passe' => 'admin',  
                'prenom' => 'Ad',
                'nom' => 'Min',
            ],
            [
                'email' => 'prof@hotmail.ca',
                'mot_passe' => 'prof',  
                'prenom' => 'Prof',
                'nom' => 'Fesseur',
            ],
            [
                'email' => 'tuteur@hotmail.ca',
                'mot_passe' => 'tuteur',  
                'prenom' => 'Tutti ',
                'nom' => 'Frutti',
            ],
        ]);
    }
           
}
