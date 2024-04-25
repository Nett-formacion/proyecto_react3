<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Idioma;

class Alumno extends Model
{
    use HasFactory;

//    protected $table="alumnos";
    protected $fillable = ['nombre', 'edad', 'dni', 'email'];

    public function idiomas()
    {
        return $this->hasMany(Idioma::class);
    }
}
