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
                'date' => '2024-04-01',
                'heure' => '08:00',
                'duree' => 1,
                'jumelage_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-04-08',
                'heure' => '08:00',
                'duree' => 1,
                'jumelage_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-04-15',
                'heure' => '08:00',
                'duree' => 1,
                'jumelage_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-05-13',
                'heure' => '08:00',
                'duree' => 1,
                'jumelage_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-05-20',
                'heure' => '08:00',
                'duree' => 1,
                'jumelage_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-05-27',
                'heure' => '08:00',
                'duree' => 1,
                'jumelage_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'date' => '2024-02-07',
                'heure' => '10:45',
                'duree' => 1,
                'jumelage_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
