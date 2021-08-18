import React, {useEffect, useContext, useState} from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import {css} from '@emotion/react';
import {Imagen, Campo, SubmitForm} from '../../styles/styles';
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


const Producto = () => {
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    const router = useRouter();
    const {query: { id }} = router;

    const {firebase} = useContext(FirebaseContext);

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
    },[id]);

    const {comentarios, creado, descripcion, empresa, nombre, urlimagen, votos} = producto;

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
                        <h2>Agregar Comentario</h2>
                        <form>
                            <Campo>
                                <input
                                    type="text"
                                    name="mensaje"
                                />
                            </Campo>
                            <SubmitForm
                                type="submit" 
                                value="Agregar Comentario"
                            />
                        </form>

                        <h2>Cometarios: </h2>
                    </div>
                    <aside>

                    </aside>
                </ContenedorProducto>
            </div>
            
            }
            
        </Layout>
     );
}
 
export default Producto;