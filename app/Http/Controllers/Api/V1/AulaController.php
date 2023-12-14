<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AulaForm;
use App\Http\Resources\AulaResource;
use App\Models\Aula;
use Illuminate\Http\Request;

class AulaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (request()->exists('aulaId') && request()->exists('turno')) {
            $aulaId = request()->aulaId;
            $turno = request()->turno;

            if (is_numeric($aulaId)) {
                $aula = Aula::find($aulaId);
            }else {
                $aula = Aula::whereHas('nombre', function ($query) use ($aulaId) {
                    $query->where('nombre', '=', $aulaId);
                })->get();
            }

            $aulas = $aula->modulos()->join('cursos', 'modulos.curso_id', '=', 'cursos.id')
            ->where('cursos.turno',$turno)
            ->with('user')->get();  
            
            return $aulas;

        }if (request()->has('page')) {
            // Obtiene las aulas paginadas
            $perPage = 6; // Número de elementos por página (ajusta según tus necesidades)
            $aulas = Aula::orderByRaw("CAST(SUBSTRING(nombre FROM 2) AS SIGNED)")->orderBy('nombre')->paginate($perPage);
        } else {
            $aulas = Aula::orderByRaw("CAST(SUBSTRING(nombre FROM 2) AS SIGNED)")->orderBy('nombre')->get();
        }
        return AulaResource::collection($aulas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AulaForm $request)
    {
        $aula = Aula::create($request->all());
        return new AulaResource($aula);
    }

    /**
     * Display the specified resource.
     */
    public function show(Aula $aula)
    {
        return new AulaResource($aula);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AulaForm $request, Aula $aula)
    {
        
        $aula->update([
            'nombre' => $request->nombre,
            'horas_m' => $request->horas_m,
            'horas_t' => $request->horas_t,
        ]);

        return new AulaResource($aula);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aula $aula)
    {
        $aula->delete();

        // Devuelve una respuesta JSON con un mensaje de éxito.
        return new AulaResource($aula);
    }
}
