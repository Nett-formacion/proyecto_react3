<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AlumnoFactory extends Factory
{

    private function get_dni():string{
        $number =fake()->numberBetween(10000000,99999999);
        $letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        $letra = $letras[$number %23];
        return "$number-$letra";

    }
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        "nombre"=>fake()->name(),
        "dni"=>$this->get_dni(),
        "edad"=>fake()->numberBetween(10,70),
        "email"=>fake()->email()
            //
        ];
    }
}
