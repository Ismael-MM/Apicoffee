<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        if (request()->exists('departamento')) {
            $departamento = request()->departamento;
            if (is_numeric($departamento)) {
                $usuarios = User::where('departamento_id', '=', request()->departamento)->orderBy('name','asc')->get();
            }else {
                $usuarios = User::whereHas('departamento', function ($query) use ($departamento) {
                    $query->where('nombre', '=', $departamento);
                })->orderBy('name','asc')->get();
            }
        }else {
            $usuarios = User::all();
        }

        // Devuelve una respuesta JSON con los registros de módulo y un mensaje de éxito.
        return UserResource::collection($usuarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource ($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
        if (Request()->update != null) {
            $user->update([
                'distribucion' => $request->distribucion,
                'observaciones' => $request->observaciones,
                'horas_total' => $request->horas_total
            ]);
        }else {
            $user->update([
                //completar
            ]);
        }

        // Devuelve una respuesta JSON con el registro de módulo actualizado y un mensaje de éxito.
        return new UserResource ($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        // Devuelve una respuesta JSON con un mensaje de éxito.
        return new UserResource ($user);
    }
}
