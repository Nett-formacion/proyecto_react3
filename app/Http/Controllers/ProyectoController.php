<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Http\Requests\StoreProyectoRequest;
use App\Http\Requests\UpdateProyectoRequest;
use Inertia\Inertia;

class ProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $filas = Proyecto::all();
        $campos=$filas[0]->getFillable();
        $tabla="proyectos";

        return Inertia::render('Proyectos/Index', compact('tabla','campos','filas'));


        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        info("ProyectosController => create");
        return Inertia::render('Proyectos/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProyectoRequest $request)
    {
        $proyecto = new Proyecto($request->input());
        $proyecto->save();
        return redirect (route('proyectos.index'));

        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Proyecto $proyecto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proyecto $proyecto)
    {
        info("ProyectosController => create");
        info ($proyecto);
        return Inertia::render('Proyectos/Edit',['fila'=>$proyecto,'nombre'=>"proyectos"]);
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProyectoRequest $request, Proyecto $proyecto)
    {
        $datos = $request->input();
        $proyecto->update($datos);
        return redirect (route('proyectos.index'));
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proyecto $proyecto)
    {
        $proyecto->delete();
        return redirect (route('proyectos.index'));
        //
    }
}
