<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departamentos')->insert([
            'nombre' => 'informatica y algo mas',
        ]);
        DB::table('departamentos')->insert([
            'nombre' => 'socio algo',
        ]);
        DB::table('departamentos')->insert([
            'nombre' => 'la de cosas del pelo',
        ]);
    }
}
