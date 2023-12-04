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
            'nombre' => 'aplicaciones webs',
        ]);
        DB::table('especialidads')->insert([
            'nombre' => 'electicidad',
        ]);
    }
}
