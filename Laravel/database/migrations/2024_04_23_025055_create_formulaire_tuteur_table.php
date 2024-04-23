<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     *! MIGRATION TO BE TESTED !
     * IF MIGRATION OF THIS TABLE CAUSES PROBLEMS COMMENT IT !!!
     * Alexander
     * ps: seeder to be made. remove when done
     */
    public function up(): void
    {
        Schema::create('formulaire_tuteur', function (Blueprint $table) {
            $table->id();
            $table->string('matiereVu');
            $table->string('aisanceAide');
            $table->string('aisanceTuteur');
            $table->integer('evaluation');
            $table->string('noteProfesseur');
            //ajouter rencontre quand fait
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formulaire_tuteur');
    }
};
