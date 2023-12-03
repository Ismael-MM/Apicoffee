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
Route::get('/html/main', function () {
    $pathToFile = public_path('html/main.html');
    return response()->file($pathToFile);
});
