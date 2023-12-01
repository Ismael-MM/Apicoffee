<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Especialidad;
use Illuminate\Http\Request;
use App\Http\Requests\EspecialidadForm;
use App\Http\Resources\EspecialidadResource;

class EspecialidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $especialidad = Especialidad::all();

        // Devuelve una respuesta JSON con los registros de módulo y un mensaje de éxito.
        return EspecialidadResource::collection($especialidad);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EspecialidadForm $request)
    {
        $especialidad = Especialidad::create([
            'nombre' => $request->nombre,
        ]);

        // Finalmente, devuelve una respuesta JSON con el nuevo registro de módulo y un mensaje de éxito.
        return new EspecialidadResource($especialidad);
    }

    /**
     * Display the specified resource.
     */
    public function show(Especialidad $especialidad)
    {
        return new EspecialidadResource($especialidad);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EspecialidadForm $request, Especialidad $especialidad)
    {
        $especialidad->update([
            'nombre' => $request->nombre,
        ]);

        // Devuelve una respuesta JSON con el registro de módulo actualizado y un mensaje de éxito.
        return new EspecialidadResource($especialidad);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Especialidad $especialidad)
    {
        $especialidad->delete();

        // Devuelve una respuesta JSON con un mensaje de éxito.
        return new EspecialidadResource($especialidad);
    }
}
