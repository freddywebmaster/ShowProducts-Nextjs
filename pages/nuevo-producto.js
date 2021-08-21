import React, {useState, useContext, useRef} from 'react'
import Layout from '../components/layout/Layout';
import {css} from '@emotion/react';
import {Formulario, Campo, SubmitForm, Error} from '../styles/styles';
import Router, {useRouter} from 'next/router';
import firebase ,{FirebaseContext} from '../firebase';
import FileUploader from 'react-firebase-file-uploader';
//hook para validar form
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validaciones/validarCrearProducto';
import Error404 from '../components/layout/404';
const NuevoProducto = () => {

  // state de las imagenes
  const [nombreimagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState('');

  const [error, setError] = useState('');
  const router = useRouter();

  const stateInitial = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
  }

  const {
    valores,
    errores,
    handleSubmit,
    handleChange
  } = useValidacion(stateInitial, validarCrearProducto, crearProducto);

  const {nombre, empresa, url, descripcion} = valores;

  const {usuario} = useContext(FirebaseContext);
  
  async function crearProducto(){
    if(!usuario){
      return router.push('/login');
    }

    //creando prod initial
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }

    //guardar prod
    try {
      await firebase.db.collection('productos').add(producto);
      alert('Producto Guardado')
    } catch (error) {
      console.log('Hubo un error', error);
      setError(error.message);
    }
  }

  //subir imagen fuc

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
      guardarSubiendo(error);
      console.error(error);
  };

  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre)
    firebase
      .storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          guardarUrlImagen(url);
        });
  };

  return (
    <Layout>
      { !usuario ? <Error404 mensaje="Inicia sesion primero crack ;)" />:
      (<><h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >Nuevo Producto</h1>
      <Formulario onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Informacion General</legend>
        
        <Campo>
          <label htmlFor="nombre">Nombre</label>
          <input 
            type="text"
            id="nombre"
            placeholder=" Tu nombre"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </Campo>
        { errores.nombre && <Error>{errores.nombre}</Error> }

        <Campo>
          <label htmlFor="empresa">Empresa</label>
          <input 
            type="text"
            id="empresa"
            placeholder=" Tu empresa"
            name="empresa"
            value={empresa}
            onChange={handleChange}
          />
        </Campo>
        { errores.empresa && <Error>{errores.empresa}</Error> }

        <Campo>
          <label htmlFor="imagen">Imagen</label>
          <FileUploader 
            accept="image/*"
            id="imagen"
            name="imagen"
            randomizeFilename
            storageRef={firebase.storage.ref("productos")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </Campo>

        <Campo>
          <label htmlFor="url">URL</label>
          <input 
            type="url"
            id="url"
            placeholder="https://tu-url.com"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </Campo>
        { errores.url && <Error>{errores.url}</Error> }

        </fieldset>

        <fieldset>
          <legend>Sobre tu producto</legend>

          <Campo>
            <label htmlFor="descripcion">Descripcion</label>
            <textarea 
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={handleChange}
            />
          </Campo>
          { errores.descripcion && <Error>{errores.descripcion}</Error> }

        </fieldset>
        { error && <Error>{error}</Error> }

        <SubmitForm
          type="submit" 
          value="Crear Producto"
        />
      </Formulario></>)}
    </Layout>
   );
}
 
export default NuevoProducto;