<?php

namespace Database\Seeders;

use App\Models\Alumno;
use App\Models\Idioma;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlumnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $idiomas = config("idiomas");

        Alumno::factory(5)->create()->each(function (Alumno $alumno) use ($idiomas) {
            $numero_idiomas = rand(0, 4);
            $listado_idiomas = match ($numero_idiomas) {
                0 => [],
                1 => [$idiomas[array_rand($idiomas)]],
                default => array_map(function ($index) use ($idiomas) {
                        return ($idiomas [$index]);
                }, array_rand($idiomas, $numero_idiomas))
            };

            foreach ($listado_idiomas as $idioma_hablado) {
                $idioma = new Idioma();
                $idioma->alumno_id= $alumno->id;
                $idioma->idioma= $idioma_hablado;
                $idioma->save();
            }
        });
    }
}
