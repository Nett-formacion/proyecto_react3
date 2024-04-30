import React, {useEffect, useState} from 'react';
import Layout from "@/Layouts/Layout.jsx";
import axios from "axios";
import Tabla from "@/Components/Tabla.jsx";
import {Inertia} from "@inertiajs/inertia";

export default function Index({imagesServer=[]}) {
    // Estado para almacenar los usuarios
    const [usuarios, setUsuarios] = useState([]);
    const [repos, setRepos] = useState([]);
    const [imagenes, setImages] = useState([])
    const [visible, setVisible] = useState(true);


    const handleClose = () => {
        setVisible(true)
        setUsuarios([])
        setImages([])
        setRepos([])
    }

    useEffect (()=>{
        if (imagesServer.length>0) {
            setImages(imagesServer)
            setVisible(false)
        }
    },[imagesServer])

    const getImages = () => {
        setVisible(false)
        // OPCION 3 lo mismo pero con axios
        axios.get("http://localhost:8000/GetImages")
         .then((response)=>{
             console.log (response)
             setImages(response.data)
         }
        ).catch(error => {
            console.error('Error fetching images:', error);
        });
        console.log (imagenes);
        // //OPCION 2 usar server como proxy
        // Inertia.get(route("GetImages",{},{
        //     onSuccess:(page)=>{
        //         console.log(page.props.imagesServer)
        //         setImages(page.props.imagesServer)
        //         setVisible(false)
        //     },
        //     onError:(error)=>
        //         console.error("Se ha producido un error"+error)
        // }));

        // OPción 1 realizar la solicitud desde el cliente
        // const accessKey = 'EMi4yUpe5MzEVryUwiwUA4JHiX46lByLXuMvQD1ONA8'; // Reemplaza 'TU_CLAVE_API' con tu clave de API real
        // const count=1; //número de imágenes
        //
        // axios.get(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`)
        //     .then(response => {
        //         console.log(response.data); // Muestra la información de la foto en la consola
        //         setImages(response.data)
        //     })
        //     .catch(error => {
        //         console.error('Error al obtener imágenes:', error);
        //     });
    }
    const getUsuariosGit = async () => {
        setVisible(false);
        try {
            const response = await axios({
                method: "get",
                url: "https://api.github.com/search/users?q=location:Zaragoza", // Especifica un criterio de búsqueda, como la ubicación
                responseType: "json"
            });
            console.log(response.data); // Manejo de la respuesta
            setUsuarios(response.data.items); // Suponiendo que los datos de usuario están en 'items'
        } catch (error) {
            console.error("Error en la consulta: ", error);
        }
    }

    return (
        <Layout>

            {visible && (<div className="grid grid-cols-4 gap-4 m-4 p-4">

                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src="images/GIT_Repository.jpg" alt="Users Git"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">Git access</h2>
                        <p>Repos de lenguajes</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Obtener datos</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl image-full">

                    <figure><img src="images/GIT_Users.jpeg" alt="Users Git"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Git access</h2>
                        <p>Usuarios de git</p>
                        <div className="card-actions justify-end">
                            <button onClick={getUsuariosGit} className="btn btn-primary">Obtener datos</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src="images/IMAGES_Unsplash.jpeg" alt="Users Git"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">Imágenes de unsplash</h2>
                        <p>Imágenes</p>
                        <div className="card-actions justify-end">
                            <button onClick={getImages} className="btn btn-primary">Obtener imágenes</button>
                        </div>
                    </div>
                </div>
            </div>)}
            {/* Renderizar la tabla de imágenes si hay */}

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
                {imagenes.length > 0 && imagenes.map((imgUrl, index) => (
                        <img key={index} src={imgUrl} alt={`Imagen ${index}`} />
                    ))}



                {/*    imagenes.map((image, index) => (*/}
                {/*    <div key={index} style={{width: '100%', aspectRatio: '1'}}>*/}
                {/*        <img src={image.links.html} alt="imagen" />*/}
                {/*        /!*<div>Slug: {image.alternative_slugs.es}</div>*!/*/}
                {/*        /!*<div>Username: {image.user.username}</div>*!/*/}
                {/*        <a href={image.links.html} target="_blank" rel="noopener noreferrer">Ver Imagen</a>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
            {/* Renderizar la tabla de usuarios si hay datos */}
            {usuarios.length > 0 && (
                <div onClick={handleClose} class="flex flex-col justify-center items-center h-full">
                    <button class="btn btn-primary">Cerrar</button>
                    <Tabla nombre="Cerrar" campos={['login', 'url']}
                           filas={usuarios.map(user => ({
                               id: user.id,
                               login: user.login,
                               url: user.html_url
                           }))}/></div>)}
        </Layout>
    );
}
