<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'email' => 'user1@user1.com',
            'name' => 'user1',
            'password' => '12345678',
            'rol' => 'docente',
            'horas_total' => 18,
            'observaciones' => "",
            'departamento_id' => 2,
            'especialidad_id' => 3,
        ]);
        DB::table('users')->insert([
            'email' => 'user2@user2.com',
            'name' => 'user2',
            'password' => '12345678',
            'rol' => 'docente',
            'horas_total' => 18,
            'observaciones' => "",
            'departamento_id' => 1,
            'especialidad_id' => 1,
        ]);
        DB::table('users')->insert([
            'email' => 'user3@user3.com',
            'name' => 'user3',
            'password' => '12345678',
            'rol' => 'docente',
            'horas_total' => 18,
            'observaciones' => "",
            'departamento_id' => 3,
            'especialidad_id' => 2,
        ]);
        DB::table('users')->insert([
            'email' => 'user4@user4.com',
            'name' => 'user4',
            'password' => '12345678',
            'rol' => 'docente',
            'horas_total' => 18,
            'observaciones' => "",
            'departamento_id' => 3,
            'especialidad_id' => 3,
        ]);
        DB::table('users')->insert([
            'email' => 'user5@user5.com',
            'name' => 'user5',
            'password' => '12345678',
            'rol' => 'docente',
            'horas_total' => 18,
            'observaciones' => "",
            'departamento_id' => 2,
            'especialidad_id' => 2,
        ]);
        DB::table('users')->insert([
            'email' => 'user6@user6.com',
            'name' => 'user6',
            'password' => '12345678',
            'rol' => 'docente',
            'horas_total' => 18,
            'observaciones' => "",
            'departamento_id' => 1,
            'especialidad_id' => 3,
        ]);
        DB::table('users')->insert([
            'email' => 'user7@user7.com',
            'name' => 'user1',
            'password' => '12345678',
            'rol' => 'docente',
            'horas_total' => 18,
            'observaciones' => "",
            'departamento_id' => 2,
            'especialidad_id' => 2,
        ]);
    }
}
