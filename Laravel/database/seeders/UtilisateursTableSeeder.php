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
                'prenom' => 'User',
                'nom' => 'User',
                'role' => 'aider'
            ],
            [
                'email' => 'admin@hotmail.ca',
                'password' => Hash::make('admin'),  
                'prenom' => 'Ad',
                'nom' => 'Min',
                'role' => 'admin'
            ],
            [
                'email' => 'prof@hotmail.ca',
                'password' => Hash::make('prof'),  
                'prenom' => 'Prof',
                'nom' => 'Fesseur',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'tuteur@hotmail.ca',
                'password' => Hash::make('tuteur'),  
                'prenom' => 'Tutti ',
                'nom' => 'Frutti',
                'role' => 'tuteur'
            ],
            [
                'email' => 'root',
                'password' => Hash::make('root'), 
                'prenom' => 'root ',
                'nom' => 'root ',
                'role' => 'aider'
            ]
        ]);
    }
           
}
