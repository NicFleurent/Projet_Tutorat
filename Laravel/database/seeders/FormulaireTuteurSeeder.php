<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormulaireTuteurSeeder extends Seeder
{
   
    public function run(): void
    {
        DB::table('formulaire_tuteurs')->insert([
            [
                'rencontre_id'       => '1',
                'matiere_vu'        => 'for loop',
                'note_aisance_aide'       => '5',
                'commentaire_aisance_aide' => 'okay',
                'note_aisance_tuteur'     => '4',
                'commentaire_aisance_tuteur' => 'okay',
                'note_evaluation'  => '5',
                'commentaire_evaluation' => 'Il a fait un excellent travail a maider à apprendre le sujet :D.',
            ],
        ]);
    }
}
