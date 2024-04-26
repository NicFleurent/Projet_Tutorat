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
                'jumelage_id'       => '1',
                'aisanceAide'       => '5',
                'aisanceTuteur'     => '4',
                'evaluationTuteur'  => '5',
                'commentaire'       => 'Il a fait un excellent travail a maider à apprendre le sujet :D.',
                'noteProfesseur'    => 'N/a'
            ],
            [
                'jumelage_id'       => '6',
                'aisanceAide'       => '5',
                'aisanceTuteur'     => '1',
                'evaluationTuteur'  => '1',
                'commentaire'       => 'Le pire tuteur avec lequel j ai jamais eu le mécontentement davoir affaire, il ne savait même pas la moitié de ce que il devait maider avec et la moitié du temps il était sur son téléphone à jouer à Angry Birds >:C !!!!',
                'noteProfesseur'    => 'S il vous plaît venez me voir à mon bureau afin que nous puissions discuter davantage de cette situation'
            ]
        ]);
    }
}
