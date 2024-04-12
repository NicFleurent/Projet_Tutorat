<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateursTable extends Migration
{

    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('email', 100)->unique();
            $table->string('mot_passe', 256);
            $table->string('prenom', 100);
            $table->string('nom', 100);
            $table->timestamps();
        });

        // Create the trigger
        DB::unprepared('
            CREATE TRIGGER insert_mot_passe_hash BEFORE INSERT ON utilisateurs
            FOR EACH ROW
            BEGIN
                SET NEW.mot_passe = SHA2(NEW.mot_passe, 256);
            END
        ');
    }

    public function down(): void
    {
        // Drop the trigger and table if migration is rolled back
        Schema::dropIfExists('utilisateurs');
        DB::unprepared('DROP TRIGGER IF EXISTS insert_mot_passe_hash');
    }
}