import React, {useContext} from 'react'
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link';
import {ContenedorHeader, Logo, Boton} from '../../styles/styles';
import {css} from '@emotion/react';
import {FirebaseContext} from '../../firebase';

const Header = () => {

    const {usuario, firebase } = useContext(FirebaseContext);
    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>SP</Logo>
                    </Link>

                    <Buscar/>
                    
                    <Navegacion/>
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {
                        usuario ? 
                        (
                            <>
                                <p
                                    css={css`
                                        margin-right: 2rem;
                                    `}
                                >Hola: {usuario.displayName}</p>

                                <Boton 
                                    onClick={ ()=> firebase.cerrarSesion() }
                                    bgColor="true">
                                    Cerrar Sesion
                                </Boton>

                            </>
                        ) :
                        (
                            <>
                                <Link href="/login">
                                    <Boton bgColor="true">Iniciar Sesion</Boton>
                                </Link>
                                <Link href="/crear-cuenta">
                                    <Boton>Crear Cuenta</Boton>
                                </Link>
                            </>
                        )
                    }
                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header;