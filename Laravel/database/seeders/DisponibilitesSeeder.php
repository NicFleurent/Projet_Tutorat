<?php

namespace Database\Seeders;
use Carbon\Carbon;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DisponibilitesSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('disponibilites')->insert([
            [
                'journee' => 'Mardi',
                'heure' => '10:30',
                'utilisateur_id' => 4
            ],
        ]);
    }
}