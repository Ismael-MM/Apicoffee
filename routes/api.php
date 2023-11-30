<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ModuloController;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Http\Controllers\Api\V1\EspecialidadController;

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
            return response()->json(['error' => "texto"],404);
        });
        Route::apiResource('especialidades', EspecialidadController::class)->missing(function (Request $request) {
            abort(404);
        });
    });

    Route::post('/logout', [LoginRegisterController::class, 'logout']);
});

Route::controller(LoginRegisterController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});