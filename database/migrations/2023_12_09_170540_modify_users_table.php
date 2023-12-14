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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('departamento_id');
            $table->unsignedBigInteger('especialidad_id');
            $table->string('observaciones')->default(null);
            $table->unsignedTinyInteger('horas_total')->default(null);
            $table->string('rol');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('departamento_id');
            $table->dropColumn('especialidad_id');
            $table->dropColumn('observaciones');
            $table->dropColumn('horas_total');
            $table->dropColumn('rol');
        });
    }
};
