<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('formulaire_aides', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jumelage_id');
            $table->integer('aisanceAide');               //1-5
            $table->integer('aisanceTuteur');            //1-5
            $table->integer('evaluationTuteur');        //1-5
            $table->string('commentaire');
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
