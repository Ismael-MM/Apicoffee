<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'email' => 'user1@user.com',
                'name' => 'user1',
                'password' => Hash::make('12345678'),
                'rol' => 'docente',
                'horas_total' => 0,
                'observaciones' => "",
                'departamento_id' => 1,
                'especialidad_id' => 1,
                'estado' => "",
            ],
            [
                'email' => 'user2@user.com',
                'name' => 'user2',
                'password' => Hash::make('12345678'),
                'rol' => 'docente',
                'horas_total' => 0,
                'observaciones' => "",
                'departamento_id' => 1,
                'especialidad_id' => 2,
                'estado' => "",
            ],
            [
                'email' => 'user3@user.com',
                'name' => 'user3',
                'password' => Hash::make('12345678'),
                'rol' => 'jefedepartamento',
                'horas_total' => 0,
                'observaciones' => "",
                'departamento_id' => 1,
                'especialidad_id' => 2,
                'estado' => "",
            ],
            [
                'email' => 'user4@user.com',
                'name' => 'user4',
                'password' => Hash::make('12345678'),
                'rol' => 'jefatura',
                'horas_total' => 0,
                'observaciones' => "",
                'departamento_id' => 2,
                'especialidad_id' => 1,
                'estado' => "",
            ],
            // Agrega más usuarios según sea necesario
        ]);
    }
}
