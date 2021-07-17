import React from 'react'
import Link from 'next/link';
import {NavStyle} from '../../styles/styles';
const Navegacion = () => {
    return ( 
        <NavStyle>
            <Link href="/" ><a>Inicio</a></Link>
            <Link href="/populares" ><a>Populares</a></Link>
            <Link href="/nuevo-producto" ><a>Nuevo Producto</a></Link>
        </NavStyle>
     );
}
 
export default Navegacion;