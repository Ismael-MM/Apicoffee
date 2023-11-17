<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Modulo;
use Illuminate\Http\Request;

class ModuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtén todos los registros de módulo desde la base de datos utilizando el modelo 'Modulo'.
        $modulos = Modulo::all();

        // Devuelve una respuesta JSON con los registros de módulo y un mensaje de éxito.
        return response()->json([
            'modulos' => $modulos,
            'message' => 'Registros de módulo obtenidos con éxito.'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Primero, valida los datos proporcionados en la solicitud.
        $request->validate([
            'codigo' => 'required|string|max:255',
            'materia' => 'required|string|max:255',
            'h_semanales' => 'required|integer',
            'h_totales' => 'required|integer',
            'especialidad_id' => 'required|integer',
            'curso_id' => 'required|integer',
        ]);

        // Luego, crea un nuevo registro de módulo en la base de datos.
        $modulo = Modulo::create([
            'codigo' => $request->codigo,
            'materia' => $request->materia,
            'h_semanales' => $request->h_semanales,
            'h_totales' => $request->h_totales,
            'user_id' => auth()->user()->id,
            'especialidad_id' => $request->especialidad_id,
            'curso_id' => $request->curso_id,
        ]);

        // Finalmente, devuelve una respuesta JSON con el nuevo registro de módulo y un mensaje de éxito.
        return response()->json([
            'success' => true,
            'message' => 'Módulo creado con éxito.',
            'data' => $modulo,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Modulo $modulo)
    {
        // Devuelve una respuesta JSON con el registro de módulo.
        return response()->json([
            'success' => true,
            'message' => 'Registro de módulo obtenido correctamente.',
            'data' => $modulo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Modulo $modulo)
    {
        // Valida los datos del formulario enviado por la aplicación cliente.
        $request->validate([
            'codigo' => 'required|string|max:255',
            'materia' => 'required|string|max:255',
            'h_semanales' => 'required|integer',
            'h_totales' => 'required|integer',
            'especialidad_id' => 'required|integer',
            'curso_id' => 'required|integer',
        ]);

        // Actualiza el registro de módulo en la base de datos.
        $modulo->update([
            'codigo' => $request->codigo,
            'materia' => $request->materia,
            'h_semanales' => $request->h_semanales,
            'h_totales' => $request->h_totales,
            'user_id' => auth()->user()->id,
            'especialidad_id' => $request->especialidad_id,
            'curso_id' => $request->curso_id,
        ]);

        // Devuelve una respuesta JSON con el registro de módulo actualizado y un mensaje de éxito.
        return response()->json([
            'modulo' => $modulo,
            'message' => 'Registro de módulo actualizado con éxito.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modulo $modulo)
    {
        // Elimina el registro de módulo de la base de datos.
        $modulo->delete();

        // Devuelve una respuesta JSON con un mensaje de éxito.
        return response()->json([
            'message' => 'Registro de módulo eliminado con éxito.'
        ]);
    }
}
