import React, {useState} from 'react'
import Layout from '../components/layout/Layout';
import {css} from '@emotion/react';
import {Formulario, Campo, SubmitForm, Error} from '../styles/styles';
import Router from 'next/router';
import firebase from '../firebase';
//hook para validar form
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validaciones/validarCrearCuenta';

const CrearCuenta = () => {

  const [error, setError] = useState('');

  const stateInitial = {
    nombre: '',
    email: '',
    password: ''
  }

  const {
    valores,
    errores,
    handleSubmit,
    handleChange
  } = useValidacion(stateInitial, validarCrearCuenta, crearCuenta);

  const {nombre, email, password} = valores;

  async function crearCuenta(){
    try {
      await firebase.registrar(nombre, email, password);
      alert('Usuario creado')
      Router.push('/');
    } catch (error) {
      console.log('Error al crear usuario', error);
      setError(error.message);
    }
  }

  return (
    <Layout>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >Crear Cuenta</h1>
      <Formulario onSubmit={handleSubmit} noValidate>
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
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email"
            placeholder=" Tu email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Campo>
        { errores.email && <Error>{errores.email}</Error> }


        <Campo>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            placeholder=" Tu password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Campo>
        { errores.password && <Error>{errores.password}</Error> }
        { error && <Error>{error}</Error> }

        <SubmitForm
          type="submit" 
          value="Crear Cuenta"
        />
      </Formulario>
    </Layout>
   );
}
 
export default CrearCuenta;