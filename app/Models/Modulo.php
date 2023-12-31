<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'materia',
        'h_semanales',
        'h_totales',
        'user_id',
        'especialidad_id',
        'curso_id',
        'distribucion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);
    }

    public function curso(){
        return $this->belongsTo(Curso::class);
    }

    public function aulas(){
        return $this->belongsToMany(Aula::class, 'aulas_modulos');
    }
}
