<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EspecialidadResource;

class ModuloResource extends JsonResource
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
        'codigo' => $this->codigo,
        'materia' => $this->materia,
        'h_semanales' => $this->h_semanales,
        'h_totales' => $this->h_totales,
        'user_id' => $this->user_id,
        'especialidad' => new EspecialidadResource($this->especialidad),
        'curso_id' => $this->curso_id,
        // 'created_at' => $this->created_at,
        // 'updated_at' => $this->updated_at,
        ];
    }
}
