<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EspecialidadsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('especialidads')->insert([
            ['nombre' => 'SISTEMAS Y APLICACIONES INFORMÁTICAS'],
            ['nombre' => 'INFORMÁTICA'],
            ['nombre' => 'Especialidad de relleno1'],
            ['nombre' => 'Especialidad de relleno2'],
            ['nombre' => 'Especialidad de relleno3'],
            // Agrega más especialidades según sea necesario
        ]);
    }
}
