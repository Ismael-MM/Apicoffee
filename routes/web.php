<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $pathToFile = public_path('index.html');
    return response()->file($pathToFile);
})->name('login');


// Cambia el get('/html/main') por el nombre que quieras, ejemplo: 'get('/formulario')'
Route::get('/docente', function () {
    $pathToFile = public_path('html/main.html');
    return response()->file($pathToFile);
})->name('formulario');
Route::get('/jefatura', function () {
    $pathToFile = public_path('html/jefatura.html');
    return response()->file($pathToFile);
});

Route::get('/dashboard', function () {
    $pathToFile = public_path('html/dashboard.html');
    return response()->file($pathToFile);
});

Route::get('/jefeDepartamento', function () {
    $pathToFile = public_path('html/jefeDepartamento.html');
    return response()->file($pathToFile);
});

