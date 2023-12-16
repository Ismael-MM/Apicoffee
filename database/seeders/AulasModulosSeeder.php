<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AulasModulosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('aulas_modulos')->insert([
            ['modulo_id' => 1, 'aula_id' => 1],
            ['modulo_id' => 2, 'aula_id' => 1],
            ['modulo_id' => 3, 'aula_id' => 1],
            ['modulo_id' => 4, 'aula_id' => 1],
            ['modulo_id' => 5, 'aula_id' => 1],
            ['modulo_id' => 6, 'aula_id' => 1],
            ['modulo_id' => 7, 'aula_id' => 2],
            ['modulo_id' => 8, 'aula_id' => 2],
            ['modulo_id' => 9, 'aula_id' => 2],
            ['modulo_id' => 10, 'aula_id' => 2],
            ['modulo_id' => 11, 'aula_id' => 2],
            ['modulo_id' => 12, 'aula_id' => 2],
            ['modulo_id' => 13, 'aula_id' => 2],
            // Agregar más registros según sea necesario
        ]);
    }
}
