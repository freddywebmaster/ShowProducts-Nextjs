import React, { useState} from 'react'
import {InputText, InputSubmit} from '../../styles/styles';
import {css} from '@emotion/react';
import Router from 'next/router';
const Buscar = () => {
    const [busqueda, setBusqueda] = useState('');

    const buscarProducto = e => {
        e.preventDefault();
        if (busqueda.trim() == '') return;

        Router.push({
            pathname: '/buscar',
            query: { q : busqueda }
        })
    }
    return ( 
        <form
        onSubmit={buscarProducto}
            css={css`
                position: relative;
            `}
        >
            <InputText
                type="text"
                placeholder="Buscar Productos"
                onChange={e => setBusqueda(e.target.value)}
            />
            <InputSubmit type="submit"/>
        </form>
     );
}
 
export default Buscar;