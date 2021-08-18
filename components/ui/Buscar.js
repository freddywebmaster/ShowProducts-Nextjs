import React from 'react'
import {InputText, InputSubmit} from '../../styles/styles';
import {css} from '@emotion/react';

const Buscar = () => {
    return ( 
        <form
            css={css`
                position: relative;
            `}
        >
            <InputText
                type="text"
                placeholder="Buscar Productos"
            />
            <InputSubmit type="submit"/>
        </form>
     );
}
 
export default Buscar;