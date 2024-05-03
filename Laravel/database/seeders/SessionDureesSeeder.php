<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class sessionDureesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('session_durees')->insert([

            [
                'nom' => 'H24',
                'debut' => '2024-01-25',
                'fin' => '2024-06-08',
                'session_courante' => true
            ]
        ]);
    }
}
