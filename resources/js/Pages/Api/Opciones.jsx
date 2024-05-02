import React, { useEffect, useState } from 'react';
import Layout from "@/Layouts/Layout.jsx";
import axios from "axios";
import Tabla from "@/Components/Tabla.jsx";

export default function Index({lenguajes=[], imagesServer = [], filmsServer = [] }) {


    //Confirmamos datos
    console.log("Opciones.jsx" );
    console.log(lenguajes);

    const [lenguajeSeleccionado, setLenguajeSeleccionado]=useState([lenguajes[0]||""]);
    const [usuariosLenguajes, setUsuariosLenguajes]=useState([])
    const [usuarios, setUsuarios] = useState([]);
    const [imagenes, setImages] = useState([]);
    const [visible, setVisible] = useState(true);
    const [films, setFilms] = useState([]);



    useEffect(() => {
        if (imagesServer.length > 0) {
            setImages(imagesServer);
            setVisible(false);
        }
        if (filmsServer.length > 0) {
            setFilms(filmsServer); // Aquí había un error, debe ser filmsServer no imagesFilms
            setVisible(false);
        }
    }, [imagesServer, filmsServer]);
    const handleChangeLanguaje =(e)=>setLenguajeSeleccionado(e.target.value);
    const handleClose=()=>
        setVisible(true)
    const getUserLang=()=>{
        console.log ("Opciones lenguaje seleccionado" + lenguajeSeleccionado);
        const url =`https://api.github.com/search/users?q=language:${lenguajeSeleccionado}`
        axios.get(url)
            .then((response)=>{
                console.log("Obtenido users de lenguajes");
                console.log(response.data);
                setVisible(false);
                setUsuariosLenguajes(response.data.items)
            })
            .catch((error)=> {
                    console.error("Error obteniendo usuarios de un lenguaje en git");
                    console.error(error);
                }
            ) ;

    }
    const getFilms = () => {
        setVisible(false);
        axios.get("http://127.0.0.1:8000/GetFilms")
            .then(response => {
                console.log(response.data);
                setFilms(response.data);
            })
            .catch(error => console.error("Error en getFilms " + error));
    };

    const getImages = () => {
        setVisible(false);
        axios.get("http://localhost:8000/GetImages")
            .then(response => {
                console.log(response);
                setImages(response.data);
            })
            .catch(error => console.error('Error fetching images:', error));
    };

    const getUsuariosGit = async () => {
        setVisible(false);
        try {
            const response = await axios.get("https://api.github.com/search/users?q=location:Zaragoza");
            console.log(response.data);
            setUsuarios(response.data.items);
        } catch (error) {
            console.error("Error en la consulta: ", error);
        }
    };

    return (
        <Layout>
            {visible && (
                <div className="flex justify-center items-center h-full">
                        <div className="grid grid-cols-2 gap-4 ">
                            <div className="card w-96 bg-base-100 shadow-xl image-full">
                                <figure className="filter brightness-200"><img src="images/GIT_Repository.jpg"
                                                                               alt="Users Git"/>
                                </figure>
                                <div className="card-body">
                                    <h2 className="mt-7 card-title">Git access</h2>
                                    <p>Repos de lenguajes</p>
                                    <div className="card-actions justify-end">
                                            {lenguajes.length>0 &&(
                                                <select name="lenguaje" id="" onChange={handleChangeLanguaje}>
                                                    {lenguajes.map((lenguaje, index)=> (
                                                    <option key={index} value={lenguaje}>{lenguaje}</option>
                                                ))}
                                                </select>
                                            )}

                                        <button onClick={getUserLang} className="btn btn-primary">Obtener datos</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-96 bg-base-100 shadow-xl image-full">
                                <figure className="filter brightness-200">
                                    <img src="images/PELICULAS_the_movil_db.png" alt="films the movil db"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Películas </h2>
                                    <p>Películas The Movil DB</p>
                                    <div className="card-actions justify-end">
                                        <button onClick={getFilms} className="btn btn-primary">Obtener datos</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-96 bg-base-100 shadow-xl image-full">


                                <figure>
                                    <img src="images/GIT_Users.jpeg" alt="Users Git"/>
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">Git access</h2>
                                    <p>Usuarios de git</p>
                                    <div className="card-actions justify-end">
                                        <button onClick={getUsuariosGit} className="btn btn-primary">Obtener datos
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-96 bg-base-100 shadow-xl image-full">
                                <figure>
                                    <img src="images/IMAGES_Unsplash.jpeg" alt="Users Git"/>
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">Imágenes de unsplash</h2>
                                    <p>Imágenes</p>
                                    <div className="card-actions justify-end">
                                        <button onClick={getImages} className="btn btn-primary">Obtener imágenes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            )}
            {usuarios.length > 0 && (
                <div onClick={handleClose} className="flex flex-col justify-center items-center h-full">
                    <button className="btn btn-primary">Cerrar</button>
                    <Tabla nombre="Usuarios" campos={['login', 'url']}
                           filas={usuarios.map(user => ({
                               id: user.id,
                               login: user.login,
                               url: user.html_url
                           }))}/>
                </div>
            )}
            {usuariosLenguajes.length>0 && (
                <div onClick={handleClose} className="flex flex-col justify-center items-center h-full">
                    <button className="btn btn-primary">Cerrar</button>
                    <Tabla nombre={`Usuarios con repos de ${lenguajeSeleccionado}`}
                           campos={['avatar','login', 'url']}
                           filas={usuariosLenguajes.map((user => ({
                               id: user.id,
                               avatar: user.avatar_url,
                               login: user.login,
                               url: user.html_url
                           })))}/>
                </div>
            )}
        </Layout>
    );
}
