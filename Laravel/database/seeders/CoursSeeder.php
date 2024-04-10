<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cours')->insert([
            [
                'id' => '1',
                'numero' => '101-1X4-RI',
                'nom' => 'Corps humain I',
                'responsable_id' => '3',
            ],
            [
                'id' => '2',
                'numero' => '201-NYA-05',
                'nom' => 'Calcul différentiel',
                'responsable_id' => '3',
            ],
            [
                'id' => '3',
                'numero' => '420-116-RI',
                'nom' => 'Introduction à la programmation',
                'responsable_id' => '3',
            ],
            [
                'id' => '4',
                'numero' => '201-1Z5-RI',
                'nom' => 'Mathématiques électronique I',
                'responsable_id' => '3',
            ],
        ]);
    }
}
