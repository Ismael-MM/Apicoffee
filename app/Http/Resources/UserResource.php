<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'rol' => $this->rol,
            'horas_total' => $this->horas_total,
            'observaciones' => $this->observaciones,
            'especialidad' => new EspecialidadResource($this->especialidad),
            'departamento' => new DepartamentoResource($this->departamento),
            'estado' => $this->estado,
            // 'created_at' => $this->created_at,
            // 'updated_at' => $this->updated_at,
            ];
    }
}
