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
            ['nombre' => '1º Educación Infantil', 'turno' => 'tarde'],
            ['nombre' => '2º Peluquería y Estética', 'turno' => 'tarde'],
            ['nombre' => '1º Peluquería y Estética', 'turno' => 'tarde'],
            ['nombre' => '1º Sistemas Microinformáticos', 'turno' => 'manana'],
            ['nombre' => '2º Sistemas Microinformáticos', 'turno' => 'manana'],
            ['nombre' => '1º Desarrollo de Aplicaciones Web', 'turno' => 'tarde'],
            ['nombre' => '2º Desarrollo de Aplicaciones Web', 'turno' => 'manana'],
            // Agrega más cursos según sea necesario
        ]);
    }
}
