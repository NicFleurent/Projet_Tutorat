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
                'heure' => "08:00",
                'demande_accepte' => true,
                'cours_id' => 1,
                'tuteur_id' => 4,
                'aider_id' => 1,
            ],
            [
                'journee' => "Mardi",
                'heure' => "09:50",
                'demande_accepte' => false,
                'cours_id' => 5,
                'tuteur_id' => 4,
                'aider_id' => 1,
            ],
            [
                'journee' => "Mercredi",
                'heure' => "10:45",
                'demande_accepte' => true,
                'cours_id' => 10,
                'tuteur_id' => 4,
                'aider_id' => 1,
            ],
            [
                'journee' => "Jeudi",
                'heure' => "13:05",
                'demande_accepte' => false,
                'cours_id' => 12,
                'tuteur_id' => 4,
                'aider_id' => 1,
            ],
            [
                'journee' => "Vendredi",
                'heure' => "15:00",
                'demande_accepte' => true,
                'cours_id' => 3,
                'tuteur_id' => 4,
                'aider_id' => 1,
            ],
        ]);
    }
}
