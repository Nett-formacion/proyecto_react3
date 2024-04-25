<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proyecto>
 */
class ProyectoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $proyectos = config("titulos_proyectos");
        return [
            "titulo"=>fake()->randomElement($proyectos),
            "url"=>fake()->url(),
            "horas"=>fake()->numberBetween(80,250)
            //
        ];
    }
}
