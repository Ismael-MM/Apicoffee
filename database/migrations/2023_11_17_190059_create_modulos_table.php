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
        Schema::create('modulos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->string('materia');
            $table->integer('h_semanales');
            $table->integer('h_totales');
            $table->unsignedBigInteger('user_id')->nulleable()->default(0);
            $table->unsignedBigInteger('especialidad_id');
            $table->unsignedBigInteger('curso_id');
            $table->string('distribucion')->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modulos');
    }
};
