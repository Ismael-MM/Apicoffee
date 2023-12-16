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
            ['nombre' => 'A21'],
            ['nombre' => 'A27'],
            ['nombre' => 'A1'],
            ['nombre' => 'A2'],
            ['nombre' => 'A3'],
            ['nombre' => 'A4'],
            ['nombre' => 'A5'],
            ['nombre' => 'A6'],
            ['nombre' => 'A7'],
            ['nombre' => 'A8'],
            ['nombre' => 'A9'],
            ['nombre' => 'A10'],
            ['nombre' => 'A11'],
            ['nombre' => 'A12'],
            ['nombre' => 'A13'],
            ['nombre' => 'A14'],
            ['nombre' => 'A15'],
            ['nombre' => 'A16'],
            ['nombre' => 'A17'],
            ['nombre' => 'A18'],
            ['nombre' => 'A19'],
            ['nombre' => 'A20'],
            ['nombre' => 'A22'],
            ['nombre' => 'A23'],
            ['nombre' => 'A24'],
            ['nombre' => 'A25'],
            ['nombre' => 'A26'],
            ['nombre' => 'Taller 1'],
            ['nombre' => 'Taller 2'],
            ['nombre' => 'Taller 3'],
            ['nombre' => 'Taller 4'],
            ['nombre' => 'Taller 5'],
            // Agrega más aulas según sea necesario
        ]);
    }
}
