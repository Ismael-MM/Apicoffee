<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
    ];

    public function modulos()
    {
        return $this->hasMany(Modulo::class);
    }

    public function usuario()
    {
        return $this->hasMany(User::class);
    }
}
