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
                'heure' => Carbon::parse('10:30')->format('H:i'),
                'utilisateur_id' => 4
            ],
        ]);
    }
}