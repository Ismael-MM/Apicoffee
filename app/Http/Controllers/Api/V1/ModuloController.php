<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Modulo;
use Illuminate\Http\Request;
use App\Http\Requests\ModuloForm;
use App\Http\Resources\ModuloResource;

class ModuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtén todos los registros de módulo desde la base de datos utilizando el modelo 'Modulo'.
        if (request()->exists('especialidad')) {
            $Especialidad = request()->especialidad;
            if (is_numeric($Especialidad)) {
                $modulos = Modulo::where('especialidad_id', '=', request()->especialidad)->get();
            }else {
                $modulos = Modulo::whereHas('especialidad', function ($query) use ($Especialidad) {
                    $query->where('nombre', '=', $Especialidad);
                })->get();
            }
        }else if (request()->exists('usuario')) {
            $usuario = request()->usuario;
            if (is_numeric($usuario)) {
                $modulos = Modulo::where('user_id', '=', request()->usuario)->get();
            }else {
                $modulos = Modulo::whereHas('user', function ($query) use ($usuario) {
                    $query->where('name', '=', $usuario);
                })->get();
            }
        }else if (request()->exists('turno')) {
            $turnoEspecifico = request()->turno;

            $modulos = Modulo::whereHas('curso', function ($cursoQuery) use ($turnoEspecifico) {
                $cursoQuery->where('turno', $turnoEspecifico);
                })->with(['aulas' => function ($aulasQuery) {
                $aulasQuery->select('aulas.id', 'nombre'); // Puedes seleccionar las columnas que necesitas de la tabla aulas
                }])->paginate(6);

        }else {
            $modulos = Modulo::all();
        }

        // Devuelve una respuesta JSON con los registros de módulo y un mensaje de éxito.
        return ModuloResource::collection($modulos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ModuloForm $request)
    {
        // Primero, valida los datos proporcionados en la solicitud.

        // Luego, crea un nuevo registro de módulo en la base de datos.
        $modulo = Modulo::create($request->all());

        // Finalmente, devuelve una respuesta JSON con el nuevo registro de módulo y un mensaje de éxito.
        return new ModuloResource ($modulo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Modulo $modulo)
    {
        // Devuelve una respuesta JSON con el registro de módulo.
        return new ModuloResource ($modulo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ModuloForm $request, Modulo $modulo)
    {
        // Valida los datos del formulario enviado por la aplicación cliente.

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
        return new ModuloResource ($modulo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modulo $modulo)
    {
        // Elimina el registro de módulo de la base de datos.
        $modulo->delete();

        // Devuelve una respuesta JSON con un mensaje de éxito.
        return new ModuloResource ($modulo);
    }
}
