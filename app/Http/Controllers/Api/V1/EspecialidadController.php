<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Especialidad;
use Illuminate\Http\Request;
use App\Http\Requests\EspecialidadForm;

class EspecialidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $especialidad = Especialidad::all();

        // Devuelve una respuesta JSON con los registros de módulo y un mensaje de éxito.
        return response()->json([
            'especialidades' => $especialidad,
            'message' => 'Registros de especialidades obtenidos con éxito.'
        ]);
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
        return response()->json([
            'success' => true,
            'message' => 'Especialidad creada con éxito.',
            'data' => $especialidad,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Especialidad $especialidad)
    {
        return response()->json([
            'success' => true,
            'message' => 'Registro de especialidad obtenido correctamente.',
            'data' => $especialidad,
        ]);
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
        return response()->json([
            'modulo' => $especialidad,
            'message' => 'Registro de especialidad actualizado con éxito.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Especialidad $especialidad)
    {
        $especialidad->delete();

        // Devuelve una respuesta JSON con un mensaje de éxito.
        return response()->json([
            'message' => 'Registro de especialidad eliminado con éxito.'
        ]);
    }
}
