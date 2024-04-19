<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgrammesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('programmes')->insert([
            [
                'id' => '1',
                'numero' => '180.AO',
                'nom' => 'Techniques de soins infirmiers',
            ],
            [
                'id' => '2',
                'numero' => '200.BO',
                'nom' => 'Sciences de la nature',
            ],
            [
                'id' => '3',
                'numero' => '221.AO',
                'nom' => 'Technologie de l\'architecture',
            ],
            [
                'id' => '4',
                'numero' => '243.BO',
                'nom' => 'Technologie de l\'électronique',
            ],
            [
                'id' => '5',
                'numero' => '243.DO',
                'nom' => 'Technologie du génie électrique - Automatisation et contrôle',
            ],
            [
                'id' => '6',
                'numero' => '3A0.12',
                'nom' => 'Sciences humaines - Administration',
            ],
            [
                'id' => '7',
                'numero' => '410.XX',
                'nom' => 'Programmes multiples',
            ],
            [
                'id' => '8',
                'numero' => '420.BO',
                'nom' => 'Technique de l\'informatique',
            ],
            [
                'id' => '9',
                'numero' => '5A1.AL',
                'nom' => 'Arts, lettre et communication - Langues',
            ],
            [
                'id' => '10',
                'numero' => '000.XX',
                'nom' => 'Programmes multiples',
            ],
        ]);
    }
}
