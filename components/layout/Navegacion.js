import React, {useContext} from 'react'
import Link from 'next/link';
import {NavStyle} from '../../styles/styles';
import {FirebaseContext} from '../../firebase';

const Navegacion = () => {
    const {usuario } = useContext(FirebaseContext);
    return ( 
        <NavStyle>
            <Link href="/" ><a>Inicio</a></Link>
            <Link href="/populares" ><a>Populares</a></Link>
            {
                usuario && (
                    <Link href="/nuevo-producto" ><a>Nuevo Producto</a></Link>
                )
            }
        </NavStyle>
     );
}
 
export default Navegacion;