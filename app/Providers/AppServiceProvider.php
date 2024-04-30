<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;


use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $titulo = config("app.name");
        Inertia::share('nombre', $titulo);  // Compartir un valor simple

        // Compartir datos dinámicos o basados en la solicitud
        Inertia::share([
            'user' => function () {
                return Auth::user() ? Auth::user()->only('id', 'name', 'email') : null;
            },
            'flash' => function () {
                return [
                    'success' => Session::get('success'),
                    'error' => Session::get('error')
                ];
            },
        ]);
    }
}
