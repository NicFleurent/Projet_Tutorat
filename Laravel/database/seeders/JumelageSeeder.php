<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JumelageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jumelages')->insert([
            [
                'journee' => "Lundi",
                'heure' => "08:30",
                'cours_id' => 1,
                'tuteur_id' => 2,
                'aider_id' => 4,
            ],
            [
                'journee' => "Mardi",
                'heure' => "09:30",
                'cours_id' => 1,
                'tuteur_id' => 2,
                'aider_id' => 4,
            ],
            [
                'journee' => "Mercredi",
                'heure' => "14:30",
                'cours_id' => 1,
                'tuteur_id' => 2,
                'aider_id' => 4,
            ],
            [
                'journee' => "Jeudi",
                'heure' => "13:30",
                'cours_id' => 1,
                'tuteur_id' => 2,
                'aider_id' => 4,
            ],
            [
                'journee' => "Vendredi",
                'heure' => "11:30",
                'cours_id' => 1,
                'tuteur_id' => 2,
                'aider_id' => 4,
            ]
        ]);
    }
}
