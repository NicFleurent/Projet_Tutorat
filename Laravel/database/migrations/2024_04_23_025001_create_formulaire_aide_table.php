<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * ! MIGRATION TO BE TESTED !
     * IF MIGRATION OF THIS TABLE CAUSES PROBLEMS COMMENT IT !!!
     * Alexander
     * ps: seeder to be made. remove when done
     */
    public function up(): void
    {
        Schema::create('formulaire_aide', function (Blueprint $table) {
            $table->id();
            $table->string('aisanceAide');
            $table->string('aisanceTuteur');
            $table->integer('evaluationTuteur');
            $table->string('noteProfesseur');
            $table->timestamps();
            $table->foreign('jumelage_id')->references('id')->on('jumelages');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('formulaire_aide');
    }
};
