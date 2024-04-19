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
                'programme_id' => '1',
            ],
            [
                'id' => '2',
                'numero' => '101-2Z3-RI',
                'nom' => 'Corps humain II',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '3',
                'numero' => '101-3Z3-RI',
                'nom' => 'Corps humain III',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '4',
                'numero' => '101-2Y4-RI',
                'nom' => 'Microbiologie et immunologie',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '5',
                'numero' => '180-10D-RI',
                'nom' => 'Intro. à la profession et aux soins',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '7',
                'numero' => '180-203-RI',
                'nom' => 'Pharmacologie et adm, sécur. méd.',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '8',
                'numero' => '180-20A-RI',
                'nom' => 'Évaluation clinique et médecine générale',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '9',
                'numero' => '180-319-RI',
                'nom' => 'Périnatalité',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '10',
                'numero' => '180-329-RI',
                'nom' => 'Pédiatrie',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '11',
                'numero' => '180-40B-RI',
                'nom' => 'Chirurgie de base et mesure d\'urgence',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '12',
                'numero' => '180-40A-RI',
                'nom' => 'Gériatrie, perte d\'autonomie et perspectives',
                'responsable_id' => '3',
                'programme_id' => '1',
            ],
            [
                'id' => '13',
                'numero' => '201-NYA-05',
                'nom' => 'Calcul différentiel',
                'responsable_id' => '3',
                'programme_id' => '2',
            ],
            [
                'id' => '14',
                'numero' => '201-NYB-05',
                'nom' => 'Calcul intégral',
                'responsable_id' => '3',
                'programme_id' => '2',
            ],
            [
                'id' => '15',
                'numero' => '202-NYA-05',
                'nom' => 'Chimie générale : la matière',
                'responsable_id' => '3',
                'programme_id' => '2',
            ],
            [
                'id' => '16',
                'numero' => '202-NYB-05',
                'nom' => 'Chimie des solutions',
                'responsable_id' => '3',
                'programme_id' => '2',
            ],
            [
                'id' => '17',
                'numero' => '203-NYA-05',
                'nom' => 'Mécanique',
                'responsable_id' => '3',
                'programme_id' => '2',
            ],
            [
                'id' => '18',
                'numero' => '203-NYC-05',
                'nom' => 'Ondes et physique moderne',
                'responsable_id' => '3',
                'programme_id' => '2',
            ],
            [
                'id' => '19',
                'numero' => '221-106-RI',
                'nom' => 'Communication graphique',
                'responsable_id' => '3',
                'programme_id' => '3',
            ],
            [
                'id' => '20',
                'numero' => '221-243-RI',
                'nom' => 'Design architectural',
                'responsable_id' => '3',
                'programme_id' => '3',
            ],
            [
                'id' => '21',
                'numero' => '201-1Z5-RI',
                'nom' => 'Mathématiques électronique I',
                'responsable_id' => '3',
                'programme_id' => '4',
            ],
            [
                'id' => '22',
                'numero' => '201-2Z5-RI',
                'nom' => 'Mathématiques électronique II',
                'responsable_id' => '3',
                'programme_id' => '4',
            ],
            [
                'id' => '23',
                'numero' => '243-114-RI',
                'nom' => 'Circuits logiques',
                'responsable_id' => '3',
                'programme_id' => '4',
            ],
            [
                'id' => '24',
                'numero' => '243-106-RI',
                'nom' => 'Circuits électriques courant continu',
                'responsable_id' => '3',
                'programme_id' => '4',
            ],
            [
                'id' => '25',
                'numero' => '243-205-RI',
                'nom' => 'Réseau I',
                'responsable_id' => '3',
                'programme_id' => '4',
            ],
            [
                'id' => '26',
                'numero' => '243-206-RI',
                'nom' => 'Circuits électriques courant alternatif',
                'responsable_id' => '3',
                'programme_id' => '4',
            ],
            [
                'id' => '27',
                'numero' => '243-115-RI',
                'nom' => 'Automatisation',
                'responsable_id' => '3',
                'programme_id' => '5',
            ],
            [
                'id' => '28',
                'numero' => '201-103-RE',
                'nom' => 'Calcul différentiel en sciences humaines',
                'responsable_id' => '3',
                'programme_id' => '6',
            ],
            [
                'id' => '29',
                'numero' => '201-203-RE',
                'nom' => 'Calcul intégral en sciences humaines',
                'responsable_id' => '3',
                'programme_id' => '6',
            ],
            [
                'id' => '30',
                'numero' => '410-164-RI',
                'nom' => 'Introduction à la comptabilité',
                'responsable_id' => '3',
                'programme_id' => '7',
            ],
            [
                'id' => '31',
                'numero' => '420-116-RI',
                'nom' => 'Introduction à la programmation',
                'responsable_id' => '3',
                'programme_id' => '8',
            ],
            [
                'id' => '32',
                'numero' => '420-215-RI',
                'nom' => 'Programmation orientée objet',
                'responsable_id' => '3',
                'programme_id' => '8',
            ],
            [
                'id' => '33',
                'numero' => '607-104-RI',
                'nom' => 'Espagnol I',
                'responsable_id' => '3',
                'programme_id' => '9',
            ],
            [
                'id' => '34',
                'numero' => '607-214-RI',
                'nom' => 'Espagnol II',
                'responsable_id' => '3',
                'programme_id' => '9',
            ],
            [
                'id' => '35',
                'numero' => '609-103-RI',
                'nom' => 'Allemand I',
                'responsable_id' => '3',
                'programme_id' => '9',
            ],
            [
                'id' => '36',
                'numero' => '609-203-RI',
                'nom' => 'Allemand II',
                'responsable_id' => '3',
                'programme_id' => '9',
            ],
            [
                'id' => '37',
                'numero' => '604-100-MQ',
                'nom' => 'Anglais de base',
                'responsable_id' => '3',
                'programme_id' => '10',
            ],
        ]);
    }
}
