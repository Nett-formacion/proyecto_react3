import {usePage} from "@inertiajs/react";
import {Link} from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
export default function HeaderLayout(){

    const user = usePage().props.auth.user;
    console.log (user)
    function handleLogout(){
        Inertia.post("logout");
    }

return(

    <header className="h-15v bg-header flex flex-row justify-between items-center p-4">

        <img className="max-h-full" src="/images/logo.png" alt="Logo" />
            <h1 className="text-6xl text-white">Laravel App</h1>

        {!user&& (
            <div>
                <Link href="login" className="btn glass ">Acceder</Link>
                <Link href="register" className="btn glass">Registrame</Link>
            </div>)}

        {user && (
        <div className="flex space-x-2">
                {/*<h2 className="text-white text-2xl"> {{auth()->user()->name}}</h2>*/}
                <h2 className="text-white text-2xl"> {user.name}</h2>
                    {/*@csrf*/}
                    <button onClick={handleLogout} type="submit" className="btn glass">Logout</button>

            </div>
        )}


    </header>
)
}
