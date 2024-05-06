import React, {useEffect, useState} from 'react';
import Layout from "@/Layouts/Layout.jsx";
import axios from "axios";
import Tabla from "@/Components/Tabla.jsx";


export default function Opciones({langs = []}
) {


  //Confirmamos datos
  console.log("Opciones.jsx");
  console.log(langs);
  const [visible, setVisible] = useState(true);
  const [langSelected, setLangSelected] = useState("");

  const [images, setImages]=useState([])


  //valores para la tabla
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [crud, setCrud] = useState(false);

  const handleLangSelected = (e) => (
    setLangSelected(e.target.value)
  );
  const handleClose=()=>{

    setVisible(true);
    setRows([]);
    setFields([]);
    setName("")

  }
  const getUserGitLang = () => {
    console.log(langSelected);
    axios.get(`https://api.github.com/search/users?q=language:${langSelected}`)
        .then  ((response) => {
          setVisible(false)
          setFields(["avatar", "login", "url"]);
          setRows(response.data.items.map((data) =>({
              avatar: data.avatar_url,
              login: data.login,
              url: data.url,
            }
        )));
          setCrud(false)
          setName(`Usuarios Git con repos de ${langSelected}`)
          //Verificadmos valores
          console.log("filas :");
          console.log(rows);
        })
        .catch = ((error) => {
        console.error("Error en getUserGitLang")
        console.error(error)
      })
    }
  const getGitUsers = () => {
    //Vamos a obtener usuarios de Zaragoza
    console.log(langSelected);
    axios.get(`https://api.github.com/search/users?q=location:Zaragoza`)
        .then  ((response) => {
          setVisible(false)
          setFields(["avatar", "login", "url"]);
          setRows(response.data.items.map((data) =>({
              avatar: data.avatar_url,
              login: data.login,
              url: data.url,
            }
        )));
          setCrud(false)
          setName(`Usuarios Git de Zaragoza`)
          //Verificadmos valores
          console.log("filas :");
          console.log(rows);
        })
        .catch = ((error) => {
        console.error("Error en getUserGit")
        console.error(error)
      })
    }
    const getImages = () => {
    //Vamos a obtener usuarios de Zaragoza

    const secret = "EMi4yUpe5MzEVryUwiwUA4JHiX46lByLXuMvQD1ONA8";
    const url_base = `https://api.unsplash.com/photos/random?client_id=${secret}&count=10`;
    axios.get(url_base)
        .then  ((response) => {
          setVisible(false)
          setFields(["avatar", "url"]);
          setRows(response.data.map((data) =>({
              avatar: data.urls.regular,
              url:  data.links.download,
            }
          )));
          setCrud(false)
          setName(`10 Imágenes aleatorias`)
          console.log(images);
        })
        .catch = ((error) => {
        console.error("Error en getImages")
        console.error(error)
      })
    }
  const getFilms = () => {
    //Vamos a obtener usuarios de Zaragoza

    const secret = "0104ce154d195cabb2535d5811bb8c90";
    const url = `https://api.themoviedb.org/3/trending/all/day?language=es-ES&api_key=${secret}`;
        axios.get(url)
      .then  ((response) => {
        setVisible(false)
        setFields(["title", "url"]);
        setRows(response.data.results.map((data) =>({
            title: data.title,
            url:`https://www.themoviedb.org/movie/${data.id}`
          }
        )));
        setCrud(false)
        setName(`Películas aleatorias`)
        console.log(images);
      })
      .catch = ((error) => {
      console.error("Error en getImages")
      console.error(error)
    })
  }

  const getFilmsServer=()=>{
    axios.get("http://127.0.0.1:8000/films")
      .then  ((response) => {
        setVisible(false)
        setFields(["title", "url"]);
        setRows(response.data.results.map((data) =>({
            title: data.title,
            url:`https://www.themoviedb.org/movie/${data.id}`
          }
        )));
        setCrud(false)
        setName(`Películas aleatorias`)
        console.log(images);
      })
      .catch = ((error) => {
      console.error("Error en getImages")
      console.error(error)
    })
  }






  return (
    <Layout>
      {visible && (
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <img src="images/GIT_Users.jpeg" alt="Users Git"/>
              </figure>
              <div className="card-body">
                <h2 className="card-title">Repositorios Git</h2>
                <p>Lenguajes de programación</p>
                <div className="card-actions justify-end">
                  {langs.length > 0 && (
                    <select onChange={handleLangSelected} value={langSelected} className="text-blue-700">
                      {langs.map((lang, index) => (
                          <option key={index}>{lang}</option>
                        )
                      )}
                    </select>
                  )}

                  <button onClick={getUserGitLang} className="btn btn-primary">Obtener datos
                  </button>
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
                  <button onClick={getGitUsers} className="btn btn-primary">Obtener datos
                  </button>
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
                  <button onClick={getFilmsServer} className="btn btn-primary">Obtener datos</button>
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

      {!visible  &&(
          <div onClick={handleClose} className="flex flex-col justify-center items-center h-full">
            <button className="btn btn-primary">Cerrar</button>
              <Tabla nombre={name} campos={fields} filas={rows} crud={false}/>
          </div>

      )}

    </Layout>
  );
}
