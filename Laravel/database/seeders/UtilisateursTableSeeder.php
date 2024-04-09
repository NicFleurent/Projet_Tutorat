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
                'email' => 'dummyEmail@hotmail.test',
                'motPasse' => 'dummyPassword',
                'prenom' => 'Jhon',
                'nom' => 'Doe',
            ],

        ]);
    }
           
}
