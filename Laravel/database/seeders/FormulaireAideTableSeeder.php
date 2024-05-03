<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormulaireAideTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('formulaire_aides')->insert([
            [
                'jumelage_id'       => '5',
                'aisanceAide'       => '5',
                'commentaireAisanceAide' => 'okay',
                'aisanceTuteur'     => '4',
                'commentaireAisanceTuteur' => 'okay',
                'evaluationTuteur'  => '5',
                'commentaireEvaluationTuteur' => 'Il a fait un excellent travail a maider à apprendre le sujet :D.',
                'noteProfesseur'    => 'N/a'
            ],
        ]);
    }
}
