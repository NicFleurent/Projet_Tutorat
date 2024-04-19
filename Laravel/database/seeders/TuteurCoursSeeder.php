<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TuteurCoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tuteur_cours')->insert([
            [
                'id' => 1,
                'user_id' => 4,
                'cours_id' => 1,
                'demande_accepte' => true,
            ],[
                'id' => 2,
                'user_id' => 4,
                'cours_id' => 2,
                'demande_accepte' => false,
            ],[
                'id' => 3,
                'user_id' => 4,
                'cours_id' => 3,
                'demande_accepte' => true,
            ],
        ]);
    }
}
