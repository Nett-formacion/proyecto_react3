<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ApiDataController;

Route::get("/", function(){
    return Inertia::render("Index");

});
Route::get("OpcionesDatosApi", [ApiDataController::class,'index'])->name("DatosApi");
Route::get("GetImages", [ApiDataController::class,'get_imagenes'])->name("GetImages");
Route::get("films", [ApiDataController::class,'get_films'])->name("films");
Route::get("usersGit", \App\Http\Controllers\GitController::class)->name("git_users");
Route::resource("alumnos", \App\Http\Controllers\AlumnoController::class);
Route::resource("proyectos", \App\Http\Controllers\ProyectoController::class);
//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
