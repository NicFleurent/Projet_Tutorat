<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UtilisateursTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'email' => 'user@hotmail.ca',
                'password' => Hash::make('user'),
                'prenom' => 'Mélanie',
                'nom' => 'Beaudet',
                'role' => 'aider'
            ],
            [
                'email' => 'admin@hotmail.ca',
                'password' => Hash::make('admin'),  
                'prenom' => 'Shany',
                'nom' => 'Carle',
                'role' => 'admin'
            ],
            [
                'email' => 'prof@hotmail.ca',
                'password' => Hash::make('prof'),  
                'prenom' => 'Ramla',
                'nom' => 'Ghali',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'tuteur@hotmail.ca',
                'password' => Hash::make('tuteur'),  
                'prenom' => 'Paul',
                'nom' => 'Tremblay',
                'role' => 'tuteur'
            ],
            [
                'email' => 'tuteurdemo@hotmail.ca',
                'password' => Hash::make('tuteurdemo'),  
                'prenom' => 'François',
                'nom' => 'Bolduc',
                'role' => 'tuteur'
            ],
        ]);
    }
           
}
