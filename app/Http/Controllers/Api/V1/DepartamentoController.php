<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Departamento;
use Illuminate\Http\Request;
use App\Http\Requests\DepartamentoForm;
use App\Http\Resources\DepartamentoResource;

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    if (request()->has('page')) {
        // Obtiene las aulas paginadas
        $perPage = 6; // Número de elementos por página (ajusta según tus necesidades)
        $departamentos = Departamento::orderBy('nombre','asc')->paginate($perPage);
    } else {
        $departamentos = Departamento::orderBy('nombre','asc')->get();
    }

    // Devuelve una respuesta JSON con los registros de departamento y un mensaje de éxito.
        return DepartamentoResource::collection($departamentos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DepartamentoForm $request)
    {
        $departamento = Departamento::create($request->all());
    
        // Finalmente, devuelve una respuesta JSON con el nuevo registro de departamento y un mensaje de éxito.
        return new DepartamentoResource($departamento);
    }

    /**
     * Display the specified resource.
     */
    public function show(Departamento $departamento)
    {
        return new DepartamentoResource($departamento);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DepartamentoForm $request, Departamento $departamento)
    {
        $departamento->update([
            'nombre' => $request->nombre,
        ]);

        return new DepartamentoResource($departamento);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departamento $departamento)
    {
        $departamento->delete();

    // Devuelve una respuesta JSON con un mensaje de éxito.
        return new DepartamentoResource($departamento);
    }
}
