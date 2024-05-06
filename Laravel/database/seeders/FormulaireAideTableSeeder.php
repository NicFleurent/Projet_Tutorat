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
                'aisanceAide'       => '1',
                'commentaireAisanceAide' => 'Je ne me suis pas bien senti avec mon tuteur tout au long de la rencontre.',
                'aisanceTuteur'     => '2',
                'commentaireAisanceTuteur' => 'Il était peu confiant dans ses explications et ça m\'inquiètait.',
                'evaluationTuteur'  => '1',
                'commentaireEvaluationTuteur' => 'J\'ai l\'impression de ne rien avoir appris et que ça ne m\'a pas du tout aider à passer le cours.'
            ],
        ]);
    }
}
