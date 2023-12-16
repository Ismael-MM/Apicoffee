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
            [
                'codigo' => 'AIF',
                'materia' => 'Aplicaciones ofimáticas',
                'h_semanales' => 8,
                'h_totales' => 8,
                
                'especialidad_id' => 1,
                'curso_id' => 4,
                'distribucion' => "",
            ],
            [
                'codigo' => 'MJE',
                'materia' => 'Montaje y mantenimiento de equipo',
                'h_semanales' => 7,
                'h_totales' => 7,
                
                'especialidad_id' => 1,
                'curso_id' => 4,
                'distribucion' => "",
            ],
            [
                'codigo' => 'RDE',
                'materia' => 'Redes locales',
                'h_semanales' => 7,
                'h_totales' => 7,
                
                'especialidad_id' => 1,
                'curso_id' => 4,
                'distribucion' => "",
            ],
            [
                'codigo' => 'SSV',
                'materia' => 'Sistemas operativos monopuesto',
                'h_semanales' => 5,
                'h_totales' => 5,
                
                'especialidad_id' => 1,
                'curso_id' => 4,
                'distribucion' => "",
            ],
            [
                'codigo' => 'APW',
                'materia' => 'Aplicaciones web',
                'h_semanales' => 3,
                'h_totales' => 3,
                
                'especialidad_id' => 1,
                'curso_id' => 5,
                'distribucion' => "",
            ],
            [
                'codigo' => 'SRC',
                'materia' => 'Servicios en red',
                'h_semanales' => 5,
                'h_totales' => 5,
                
                'especialidad_id' => 1,
                'curso_id' => 5,
                'distribucion' => "",
            ],
            [
                'codigo' => 'BAE',
                'materia' => 'Bases de datos',
                'h_semanales' => 6,
                'h_totales' => 6,
                
                'especialidad_id' => 2,
                'curso_id' => 6,
                'distribucion' => "",
            ],
            [
                'codigo' => 'ETS',
                'materia' => 'Entornos de desarrollo',
                'h_semanales' => 3,
                'h_totales' => 3,
                
                'especialidad_id' => 2,
                'curso_id' => 6,
                'distribucion' => "",
            ],
            [
                'codigo' => 'LND',
                'materia' => 'Lenguajes de marcas y sistemas de gestión de información',
                'h_semanales' => 4,
                'h_totales' => 4,
                
                'especialidad_id' => 2,
                'curso_id' => 6,
                'distribucion' => "",
            ],
            [
                'codigo' => 'PRO',
                'materia' => 'Programación',
                'h_semanales' => 7,
                'h_totales' => 7,
                
                'especialidad_id' => 2,
                'curso_id' => 6,
                'distribucion' => "",
            ],
            [
                'codigo' => 'DEW',
                'materia' => 'Desarrollo web en entorno cliente',
                'h_semanales' => 5,
                'h_totales' => 5,
                
                'especialidad_id' => 2,
                'curso_id' => 7,
                'distribucion' => "",
            ],
            [
                'codigo' => 'DOR',
                'materia' => 'Diseño de interfaces web',
                'h_semanales' => 4,
                'h_totales' => 4,
                
                'especialidad_id' => 2,
                'curso_id' => 7,
                'distribucion' => "",
            ],
            [
                'codigo' => 'DSW',
                'materia' => 'Desarrollo web en entorno servidor',
                'h_semanales' => 5,
                'h_totales' => 5,
                
                'especialidad_id' => 2,
                'curso_id' => 7,
                'distribucion' => "",
            ],
            // Agrega más módulos según sea necesario
        ]);
    }
}
