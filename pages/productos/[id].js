import React, {useEffect, useContext, useState} from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import {css} from '@emotion/react';
import {Imagen, Campo, SubmitForm, Boton} from '../../styles/styles';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';

const ContenedorProducto = styled.div`
    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }

`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;


const Producto = () => {
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);
    const [comentario, SetComentario] = useState({});

    const router = useRouter();
    const {query: { id }} = router;

    const {firebase, usuario} = useContext(FirebaseContext);

    useEffect(()=>{
        if(id){
            async function obtenerProducto(id){
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists){
                    setProducto(producto.data());
                }
                else{
                    setError(true);
                }
            }
            obtenerProducto(id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id, producto]);

    const {comentarios, creado, descripcion, creador, nombre, urlimagen, votos, url, haVotado} = producto;

    const votarProducto = async () =>{
        if(!usuario){
            return router.push('/login');
        }
        const nuevoTotal = votos + 1;

        if(haVotado.includes(usuario.uid)){
            return alert('Ya votaste este producto paa')
        }

        const nuevoHaVotado = [...haVotado, usuario.uid];

        await firebase.db.collection('productos').doc(id).update({ votos: nuevoTotal, haVotado: nuevoHaVotado });
    }

    const comentarioChange = (e) =>{
        SetComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    const agregarComentario = async e => {
        e.preventDefault();

        if(!usuario){
            return router.push('/login');
        }

        //info del autor
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        const nuevoComentarios = [...comentarios, comentario];
        await firebase.db.collection('productos').doc(id).update({ comentarios: nuevoComentarios });
    }

    const esCreador = (id) =>{
        if(creador.id == id){
            return true;
        }
    }

    const puedeBorrar = () =>{
        if(!usuario) return false;
        if(creador.id === usuario.uid) return true
    }

    const eliminarProducto = async () =>{
        if(!usuario){
            return router.push('/login');
        }
        if(creador.id !== usuario.uid){
            return router.push('/');
        }

        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Layout>
            {error && <Error404/> }
            {(Object.keys(producto).length ===  0) ? 'cargando...': 
            <div className="contenedor">
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                ></h1>

                <ContenedorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(creado),{locale: es})}</p>
                        <Imagen src={urlimagen} alt={nombre} />
                        <p>{descripcion}</p>
                        {
                            usuario &&(
                                <>
                                <h2>Agregar Comentario</h2>
                                <form
                                    onSubmit={agregarComentario}
                                >
                                    <Campo>
                                        <input
                                            type="text"
                                            name="mensaje"
                                            onChange={comentarioChange}
                                        />
                                    </Campo>
                                    <SubmitForm
                                        type="submit" 
                                        value="Agregar Comentario"
                                    />
                                </form>
                                </>
                            )
                        }

                        <h2>Cometarios: </h2>
                        <ul>
                            {
                                comentarios.length === 0 ? "Aun sin comentarios" : (
                                    comentarios.map((comentario, index)=>(
                                        <li key={index} 
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                margin-bottom: 1rem;
                                                padding: 2rem;
                                                -webkit-box-shadow: 3px 3px 4px -3px #000000; 
                                                box-shadow: 3px 3px 4px -3px #000000;
                                            `}
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por: <b>{comentario.usuarioNombre}</b></p>
                                            {
                                                esCreador( comentario.usuarioId ) && <CreadorProducto>Es creador</CreadorProducto>
                                            }
                                        </li>
                                    ))
                                )
                            }
                        </ul>
                    </div>
                    <aside>
                        <Boton
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visitar Url</Boton>

                        <div className="mt-5">
                            <p css={css`
                                text-align: center;
                            `}
                            >{votos} Votos</p>
                            {
                                usuario && (
                                    <Boton
                                        onClick={votarProducto}
                                    >Votar</Boton>
                                )
                            }
                        </div>
                    </aside>
                </ContenedorProducto>
                {
                   puedeBorrar() && <Boton onClick={eliminarProducto}>Eliminar Producto</Boton> 
                }
            </div>
            }
            
        </Layout>
     );
}
 
export default Producto;