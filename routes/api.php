<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ModuloController;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Http\Controllers\Api\V1\EspecialidadController;
use App\Http\Controllers\Api\V1\CursoController;
use App\Http\Controllers\Api\V1\DepartamentoController;
use App\Http\Controllers\Api\V1\AulaController;
use App\Http\Controllers\Api\V1\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::apiResource('modulos', ModuloController::class)->missing(function (Request $request) {
            return response()->json(['error' => "esa ruta no existe"],404);
        });
        Route::apiResource('especialidades', EspecialidadController::class)->missing(function (Request $request) {
            return response()->json(['error' => "esa ruta no existe"],404);
        });
        Route::apiResource('cursos', CursoController::class)->missing(function (Request $request) {
            return response()->json(['error' => "esa ruta no existe"],404);
        });
        Route::apiResource('aulas', AulaController::class)->missing(function (Request $request) {
            return response()->json(['error' => "esa ruta no existe"],404);
        });
        Route::apiResource('departamentos', DepartamentoController::class)->missing(function (Request $request) {
            return response()->json(['error' => "esa ruta no existe"],404);
        });
        Route::apiResource('usuarios', UserController::class)->missing(function (Request $request) {
            return response()->json(['error' => "esa ruta no existe"],404);
        });
    });

    Route::post('/logout', [LoginRegisterController::class, 'logout']);
});

Route::controller(LoginRegisterController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});