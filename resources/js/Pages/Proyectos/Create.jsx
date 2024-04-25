import Layout from "@/Layouts/Layout.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Inertia} from "@inertiajs/inertia";
import { router } from '@inertiajs/react'



export default function Create() {

    const  handleCancel=()=>{
        console.log("Create->método handleCancel");

        router.get("/proyectos")
    }
    const  handleSave=()=>{
        router.post("/proyectos",data)
    }


    console.log("Componente Create.jsx")
    const { data, setData, post, processing, errors, reset } = useForm({
        titulo: '',
        url: '',
        horas: '',
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
                        <PrimaryButton onClick={handleSave}  className="p-4 ms-4" disabled={processing}>
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
