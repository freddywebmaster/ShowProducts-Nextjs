import React, {useState} from 'react'
import Layout from '../components/layout/Layout';
import {css} from '@emotion/react';
import {Formulario, Campo, SubmitForm, Error} from '../styles/styles';
import Router from 'next/router';
import firebase from '../firebase';
//hook para validar form
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validaciones/validarIniciarSesion';

const Login = () => {
  const [error, setError] = useState('');

  const stateInitial = {
    email: '',
    password: ''
  }

  const {
    valores,
    errores,
    handleSubmit,
    handleChange
  } = useValidacion(stateInitial, validarIniciarSesion, iniciarSesion);

  const { email, password} = valores;

  async function iniciarSesion(){
    try {
      await firebase.login(email, password);
      alert('iniciaste sesion perro');
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
      >Iniciar Sesion</h1>
      <Formulario onSubmit={handleSubmit} noValidate>
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
          value="Iniciar Sesion"
        />
      </Formulario>
    </Layout>
   );
}
 
export default Login;