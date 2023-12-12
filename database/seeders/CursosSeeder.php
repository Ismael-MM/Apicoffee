<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CursosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cursos')->insert([
            'nombre' => '1º educacion infantil',
            'turno' => 'tarde',
        ]);
        DB::table('cursos')->insert([
            'nombre' => '2º peluqeria y estetica',
            'turno' => 'mañana',
        ]);
        DB::table('cursos')->insert([
            'nombre' => '1º DAW',
            'turno' => 'mañana',
        ]);
    }
}
