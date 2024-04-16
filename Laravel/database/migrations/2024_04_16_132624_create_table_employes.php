<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('employes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateurs_id');
            $table->integer('no_employe')->unique()->nullable(false);
            $table->double('salaire',10,2)->nullable(true);
            $table->timestamps();

            $table->foreign('utilisateurs_id')->references('id')->on('utilisateurs');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employes');
    }
};
