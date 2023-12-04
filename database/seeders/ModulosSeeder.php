<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModulosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('modulos')->insert([
            'codigo' => 'dew',
            'materia' => 'nombre1',
            'h_semanales' => 15,
            'h_totales' => 100,
            'user_id' => 1,
            'especialidad_id' => 1,
            'curso_id' => 1,
        ]);
        DB::table('modulos')->insert([
            'codigo' => 'dsw',
            'materia' => 'nombre2',
            'h_semanales' => 8,
            'h_totales' => 100,
            'user_id' => 1,
            'especialidad_id' => 2,
            'curso_id' => 1,
        ]);
        DB::table('modulos')->insert([
            'codigo' => 'dpl',
            'materia' => 'nombre3',
            'h_semanales' => 10,
            'h_totales' => 100,
            'user_id' => 1,
            'especialidad_id' => 1,
            'curso_id' => 2,
        ]);
    }
}
