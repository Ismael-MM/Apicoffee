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
            'nombre' => 'A21',
        ]);
        DB::table('aulas')->insert([
            'nombre' => 'A27',
        ]);
        DB::table('aulas')->insert([
            'nombre' => 'A22',
        ]);
        DB::table('aulas')->insert([
            'nombre' => 'Taller 2',
        ]);
    }
}
