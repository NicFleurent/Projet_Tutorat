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
                'matiere_vu'        => 'Système lymphatique, Système digestif',
                'note_aisance_aide'       => '3',
                'commentaire_aisance_aide' => 'Il n\'était pas vraiment à l\'aise au début, mais au fur et à mesure, il était de plus en plus confortable.',
                'note_aisance_tuteur'     => '4',
                'commentaire_aisance_tuteur' => 'J\'étais très à l\'aise lors de mes explications et je pense que ça à aider à détendre l\'aidé.',
                'note_evaluation'  => '4',
                'commentaire_evaluation' => 'La rencontre a super bien été.',
            ],
        ]);
    }
}
