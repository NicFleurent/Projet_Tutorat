<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RencontresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rencontres')->insert([
            [
                'date' => '2024-04-25',
                'heure' => '08:30:00',
                'duree' => 1,
                'jumelage_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-04-26',
                'heure' => '09:30:00',
                'duree' => 1,
                'jumelage_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-04-27',
                'heure' => '14:30:00',
                'duree' => 1,
                'jumelage_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-04-28',
                'heure' => '13:30:00',
                'duree' => 1,
                'jumelage_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-04-29',
                'heure' => '11:30:00',
                'duree' => 1,
                'jumelage_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
