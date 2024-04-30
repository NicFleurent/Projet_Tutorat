<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('formulaire_tuteurs', function (Blueprint $table) {
            $table->id();
            $table->string('matiere_vu');
            $table->integer('note_aisance_aide');
            $table->string('commentaire_aisance_aide');
            $table->integer('note_aisance_tuteur');
            $table->string('commentaire_aisance_tuteur');
            $table->integer('note_evaluation');
            $table->string('commentaire_evaluation');
            $table->string('commentaire_professeur')->default("Pas encore commenté");
            $table->unsignedBigInteger('rencontre_id');
            $table->foreign('rencontre_id')->references('id')->on('rencontres');
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
