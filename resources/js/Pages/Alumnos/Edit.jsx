import Layout from "@/Layouts/Layout.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Inertia} from "@inertiajs/inertia";
import { router } from '@inertiajs/react'
import Swal from "sweetalert2";



export default function Edit({fila, nombre}) {

    console.log("Componente Create.jsx")
    console.log(fila)

    const  handleCancel=()=>{
        console.log("Create->método handleCancel");

        router.get(`/${nombre}`)
    }
    const  handleUpdate=(id)=>{
        Swal({
            title:"Confirmas la Actualización",
            text:"Esta acción es definitiva",
            icon:"warning",
            buttons:true
        })
            .then
        router.put(`/${nombre}/${id}`,data)
    }



    const { data, setData, post, processing, errors, reset } = useForm({
        titulo: fila.titulo||"",
        url: fila.url||"",
        horas: fila.horas||"",
    });
    return (
        <Layout>
            <div class=" flex flex-row justify-center items-center p-8 h-full">
                <form onSubmit={(e)=>e.preventDefault()} action="" method="POST" class="bg-white rounded p-5">

                    <div>
                        <InputLabel htmlFor="titulo" value="Titulo"/>

                        <TextInput
                            id="titulo"
                            type="text"
                            name="titulo"
                            value={data.titulo}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('titulo', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="horas" value="Horas"/>

                        <TextInput
                            id="horas"
                            type="text"
                            name="horas"
                            value={data.horas}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('horas', e.target.value)}
                        />
                        <InputError message={errors.horas} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="url" value="URL"/>

                        <TextInput
                            id="url"
                            type="url"
                            name="url"
                            value={data.url}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('url', e.target.value)}
                        />
                        <InputError message={errors.url} className="mt-2"/>
                    </div>
                    <div className="p-4 m-4">

                            <PrimaryButton onClick={()=>handleUpdate(fila.id)} className="p-4 ms-4"
                                           disabled={processing}>
                                Guardar
                            </PrimaryButton>
                            <PrimaryButton onClick={handleCancel} className="p-4 ms-4" disabled={processing}>
                                Cancelar
                            </PrimaryButton>
                    </div>
                </form>
            </div>

        </Layout>
)
}
