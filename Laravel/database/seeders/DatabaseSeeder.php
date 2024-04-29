<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UtilisateursTableSeeder::class);
        $this->call(ProgrammesSeeder::class);
        $this->call(CoursSeeder::class);
        $this->call(DisponibilitesSeeder::class);
        $this->call(JumelageSeeder::class);
        $this->call(EmployesSeeder::class);
        $this->call(TuteurCoursSeeder::class);
        $this->call(RencontresTableSeeder::class);
        $this->call(sessionDureesSeeder::class);
    }
}
