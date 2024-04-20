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
                'password' => 'user',
                'prenom' => 'User',
                'nom' => 'User',
                'role' => 'aidé'
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
                'password' => 'prof',
                'prenom' => 'Prof',
                'nom' => 'Fesseur',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'tuteur@hotmail.ca',
                'password' => 'tuteur',
                'prenom' => 'Tutti ',
                'nom' => 'Frutti',
                'role' => 'tuteur'
            ],
        ]);
    }
}
