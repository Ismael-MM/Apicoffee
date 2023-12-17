<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use Illuminate\Http\Request;
use App\Http\Requests\CursoForm;
use App\Http\Resources\CursoResource;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $curso = Curso::all();

        // Devuelve una respuesta JSON con los registros de módulo y un mensaje de éxito.
        return CursoResource::collection($curso);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CursoForm $request)
    {
        $curso = Curso::create($request->all());

        return new CursoResource($curso);
    }

    /**
     * Display the specified resource.
     */
    public function show(Curso $curso)
    {
        return new CursoResource($curso);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CursoForm $request, Curso $curso)
    {
        $curso->update($request->all());

        return new CursoResource($curso);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Curso $curso)
    {
        $curso->delete();

        // Devuelve una respuesta JSON con un mensaje de éxito.
        return new CursoResource($curso);
    }
}
