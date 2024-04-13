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
                'parent_id' => null,
            ],
            [
                'id' => '2',
                'numero' => '200.BO',
                'nom' => 'Sciences de la nature',
                'parent_id' => null,
            ],
            [
                'id' => '3',
                'numero' => '200.CO',
                'nom' => 'Sciences informatiques et mathématiques',
                'parent_id' => '2',
            ],
            [
                'id' => '4',
                'numero' => '221.AO',
                'nom' => 'Technologie de l\'architecture',
                'parent_id' => null,
            ],
            [
                'id' => '5',
                'numero' => '243.BO',
                'nom' => 'Technologie de l\'électronique',
                'parent_id' => null,
            ],
            [
                'id' => '6',
                'numero' => '243.DO',
                'nom' => 'Technologie du génie électrique - Automatisation et contrôle',
                'parent_id' => null,
            ],
            [
                'id' => '7',
                'numero' => '3A0.12',
                'nom' => 'Sciences humaines - Administration',
                'parent_id' => null,
            ],
            [
                'id' => '8',
                'numero' => '3A0.12',
                'nom' => 'Sciences humaines - Parcours Découverte avec mathématiques',
                'parent_id' => '7',
            ],
            [
                'id' => '9',
                'numero' => '410.XX',
                'nom' => 'Programmes multiples',
                'parent_id' => null,
            ],
            [
                'id' => '10',
                'numero' => '420.BO',
                'nom' => 'Technique de l\'informatique',
                'parent_id' => null,
            ],
            [
                'id' => '11',
                'numero' => '420.BU',
                'nom' => 'DEC-Bac en informatique',
                'parent_id' => '10',
            ],
            [
                'id' => '12',
                'numero' => '5A1.AL',
                'nom' => 'Arts, lettre et communication - Langues',
                'parent_id' => null,
            ],
            [
                'id' => '13',
                'numero' => '000.XX',
                'nom' => 'Programmes multiples',
                'parent_id' => null,
            ],
        ]);
    }
}
