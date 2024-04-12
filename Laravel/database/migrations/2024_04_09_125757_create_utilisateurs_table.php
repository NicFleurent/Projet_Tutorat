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
            $table->string('email', 100)->unique()->nullable(false);
            $table->string('mot_passe', 256)->nullable(false);
            $table->string('prenom', 100)->nullable(false);
            $table->string('nom', 100)->nullable(false);
            $table->timestamps();
        });

        //Trigger Hash mots de passe sure Insert
        DB::unprepared('
            CREATE TRIGGER insert_mot_passe_hash BEFORE INSERT ON utilisateurs
            FOR EACH ROW
            BEGIN
                SET NEW.mot_passe = SHA2(NEW.mot_passe, 256);
            END
        ');

        //Trigger Hash mots de passe sure modification
        DB::unprepared('
            CREATE TRIGGER update_mot_passe_hash BEFORE UPDATE ON utilisateurs
            FOR EACH ROW
            BEGIN
                SET NEW.mot_passe = SHA2(NEW.mot_passe, 256);
            END
        ');


    }

    public function down(): void
    {
        
        Schema::dropIfExists('utilisateurs');
        DB::unprepared('DROP TRIGGER IF EXISTS insert_mot_passe_hash');
        DB::unprepared('DROP TRIGGER IF EXISTS update_mot_passe_hash');
    }
}