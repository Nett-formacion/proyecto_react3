import {Link} from "@inertiajs/react";
import {route} from "ziggy-js";


export default function NavLayout() {
    return (
        <nav className="h-10v bg-nav flex flex-row justify-start items-center  px-5 space-x-2">
            <a className="btn  btn-primary" href="/">Home</a>
            <a className="btn btn-secondary" href="">About</a>
            {/*@auth*/}
            <Link href={route("proyectos.index")} className="btn  btn-active">Proyectos</Link>
            {/*@endauth*/}
            <Link className="btn  btn-accent" href={route('alumnos.index')} >Alumnos</Link>
            <Link className="btn  btn-accent" href={route('DatosApi')} >Datos de API</Link>
            <a className="btn  btn-warning" href="">Contacta</a>
        </nav>
    );

}
