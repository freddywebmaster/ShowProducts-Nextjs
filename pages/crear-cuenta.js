import React from 'react'
import Layout from '../components/layout/Layout';
import {css} from '@emotion/react';
import {Formulario, Campo, SubmitForm} from '../styles/styles';

const CrearCuenta = () => {

  return (
    <Layout>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >Crear Cuenta</h1>
      <Formulario>
        <Campo>
          <label htmlFor="nombre">Nombre</label>
          <input 
            type="text"
            id="nombre"
            placeholder=" Tu nombre"
            name="nombre"
          />
        </Campo>

        <Campo>
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email"
            placeholder=" Tu email"
            name="email"
          />
        </Campo>

        <Campo>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            placeholder=" Tu password"
            name="password"
          />
        </Campo>

        <SubmitForm
          type="submit" 
          value="Crear Cuenta"
        />
      </Formulario>
    </Layout>
   );
}
 
export default CrearCuenta;