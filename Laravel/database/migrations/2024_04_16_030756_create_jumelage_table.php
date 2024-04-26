<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jumelages', function (Blueprint $table) {
            $table->id();
            $table->string('journee');
            $table->time('heure');
            $table->boolean('demande_accepte')->default(false);
            $table->foreignId('cours_id')->constrained('cours');
            $table->unsignedBigInteger('tuteur_id');
            $table->unsignedBigInteger('aider_id');
            $table->timestamps();


            // Définir les clés étrangères
            $table->foreign('tuteur_id')->references('id')->on('users');
            $table->foreign('aider_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jumelage');
    }
};
