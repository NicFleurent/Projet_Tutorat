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
                'heure' => '08:00',
                'user_id' => '4'
            ],
            [
                'journee' => 'Mardi',
                'heure' => '13:05',
                'user_id' => '4'
            ],
            [
                'journee' => 'Mardi',
                'heure' => '10:45',
                'user_id' => '5'
            ],
            [
                'journee' => 'Lundi',
                'heure' => '12:10',
                'user_id' => '4'
            ],
            [
                'journee' => 'Mercredi',
                'heure' => '8:00',
                'user_id' => '4'
            ],
            [
                'journee' => 'Vendredi',
                'heure' => '14:00',
                'user_id' => '4'
            ],
        ]);
    }
}