<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AulasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('aulas')->insert([
            ['nombre' => 'A21', 'horas_m' => 24, 'horas_t' => 17],
            ['nombre' => 'A27', 'horas_m' => 30, 'horas_t' => 26],
            ['nombre' => 'A1', 'horas_m' => 10, 'horas_t' => 8],
            ['nombre' => 'A2', 'horas_m' => 12, 'horas_t' => 10],
            ['nombre' => 'A3', 'horas_m' => 8, 'horas_t' => 6],
            ['nombre' => 'A4', 'horas_m' => 15, 'horas_t' => 12],
            ['nombre' => 'A5', 'horas_m' => 20, 'horas_t' => 18],
            ['nombre' => 'A6', 'horas_m' => 14, 'horas_t' => 10],
            ['nombre' => 'A7', 'horas_m' => 16, 'horas_t' => 14],
            ['nombre' => 'A8', 'horas_m' => 22, 'horas_t' => 20],
            ['nombre' => 'A9', 'horas_m' => 18, 'horas_t' => 16],
            ['nombre' => 'A10', 'horas_m' => 25, 'horas_t' => 22],
            ['nombre' => 'A11', 'horas_m' => 28, 'horas_t' => 24],
            ['nombre' => 'A12', 'horas_m' => 10, 'horas_t' => 8],
            ['nombre' => 'A13', 'horas_m' => 12, 'horas_t' => 10],
            ['nombre' => 'A14', 'horas_m' => 8, 'horas_t' => 6],
            ['nombre' => 'A15', 'horas_m' => 15, 'horas_t' => 12],
            ['nombre' => 'A16', 'horas_m' => 20, 'horas_t' => 18],
            ['nombre' => 'A17', 'horas_m' => 14, 'horas_t' => 10],
            ['nombre' => 'A18', 'horas_m' => 16, 'horas_t' => 14],
            ['nombre' => 'A19', 'horas_m' => 22, 'horas_t' => 20],
            ['nombre' => 'A20', 'horas_m' => 18, 'horas_t' => 16],
            ['nombre' => 'A22', 'horas_m' => 25, 'horas_t' => 22],
            ['nombre' => 'A23', 'horas_m' => 28, 'horas_t' => 24],
            ['nombre' => 'A24', 'horas_m' => 10, 'horas_t' => 8],
            ['nombre' => 'A25', 'horas_m' => 12, 'horas_t' => 10],
            ['nombre' => 'A26', 'horas_m' => 8, 'horas_t' => 6],
            ['nombre' => 'Taller 1', 'horas_m' => 15, 'horas_t' => 12],
            ['nombre' => 'Taller 2', 'horas_m' => 18, 'horas_t' => 14],
            ['nombre' => 'Taller 3', 'horas_m' => 14, 'horas_t' => 10],
            ['nombre' => 'Taller 4', 'horas_m' => 16, 'horas_t' => 14],
            ['nombre' => 'Taller 5', 'horas_m' => 22, 'horas_t' => 20],
            // Agrega más aulas según sea necesario
        ]);
    }
}
