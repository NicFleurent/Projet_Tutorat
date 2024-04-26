<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UtilisateursTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'email' => 'user@hotmail.ca',
                'password' => Hash::make('user'),
                'prenom' => 'User',
                'nom' => 'User',
                'role' => 'aider'
            ],
            [
                'email' => 'admin@hotmail.ca',
                'password' => Hash::make('admin'),  
                'prenom' => 'Ad',
                'nom' => 'Min',
                'role' => 'admin'
            ],
            [
                'email' => 'prof@hotmail.ca',
                'password' => Hash::make('prof'),  
                'prenom' => 'Prof',
                'nom' => 'Fesseur',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'tuteur@hotmail.ca',
                'password' => Hash::make('tuteur'),  
                'prenom' => 'Tutti ',
                'nom' => 'Frutti',
                'role' => 'tuteur'
            ],
            [
                'email' => 'anotheruser@hotmail.ca',
                'password' => Hash::make('anotheruser'),
                'prenom' => 'Another',
                'nom' => 'User',
                'role' => 'aider'
            ],
            [
                'email' => 'superadmin@hotmail.ca',
                'password' => Hash::make('superadmin'),  
                'prenom' => 'Super',
                'nom' => 'Admin',
                'role' => 'admin'
            ],
            [
                'email' => 'teacher@hotmail.ca',
                'password' => Hash::make('teacher'),  
                'prenom' => 'Teacher',
                'nom' => 'Smith',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'tutor2@hotmail.ca',
                'password' => Hash::make('tutor2'),  
                'prenom' => 'Twotor',
                'nom' => 'Two',
                'role' => 'tuteur'
            ],
            [
                'email' => 'johndoe@hotmail.ca',
                'password' => Hash::make('user1'),
                'prenom' => 'John',
                'nom' => 'Doe',
                'role' => 'aider'
            ],
            [
                'email' => 'janedoe@hotmail.ca',
                'password' => Hash::make('admin1'),  
                'prenom' => 'Jane',
                'nom' => 'Doe',
                'role' => 'admin'
            ],
            [
                'email' => 'jamesbond@hotmail.ca',
                'password' => Hash::make('prof1'),  
                'prenom' => 'James',
                'nom' => 'Bond',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'harrypotter@hotmail.ca',
                'password' => Hash::make('tuteur1'),  
                'prenom' => 'Harry',
                'nom' => 'Potter',
                'role' => 'tuteur'
            ],
            [
                'email' => 'hermionegranger@hotmail.ca',
                'password' => Hash::make('anotheruser1'),
                'prenom' => 'Hermione',
                'nom' => 'Granger',
                'role' => 'aider'
            ],
            [
                'email' => 'brucewayne@hotmail.ca',
                'password' => Hash::make('superadmin1'),  
                'prenom' => 'Bruce',
                'nom' => 'Wayne',
                'role' => 'admin'
            ],
            [
                'email' => 'tonystark@hotmail.ca',
                'password' => Hash::make('teacher1'),  
                'prenom' => 'Tony',
                'nom' => 'Stark',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'stevejobs@hotmail.ca',
                'password' => Hash::make('tutor21'),  
                'prenom' => 'Steve',
                'nom' => 'Jobs',
                'role' => 'tuteur'
            ],
            [
                'email' => 'elonmusk@hotmail.ca',
                'password' => Hash::make('user21'),
                'prenom' => 'Elon',
                'nom' => 'Musk',
                'role' => 'aider'
            ],
            [
                'email' => 'billgates@hotmail.ca',
                'password' => Hash::make('admin21'),  
                'prenom' => 'Bill',
                'nom' => 'Gates',
                'role' => 'admin'
            ],
            [
                'email' => 'markzuckerberg@hotmail.ca',
                'password' => Hash::make('prof21'),  
                'prenom' => 'Mark',
                'nom' => 'Zuckerberg',
                'role' => 'proffeseur'
            ],
            [
                'email' => 'jeffbezos@hotmail.ca',
                'password' => Hash::make('tuteur21'),  
                'prenom' => 'Jeff',
                'nom' => 'Bezos',
                'role' => 'tuteur'
            ],
        ]);
    }
           
}
