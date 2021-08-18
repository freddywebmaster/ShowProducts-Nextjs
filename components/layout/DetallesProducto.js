import {ProductoImg, Imagen, Producto, DescripcionProducto, Comentarios, Votos} from '../../styles/styles';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';
import Link from 'next/link';

const DetallesProducto = ({producto}) => {
    const {id, comentarios, creado, descripcion, empresa, nombre, urlimagen, votos} = producto;
    return ( 
        <Producto>
            <DescripcionProducto>
                <div>
                    <ProductoImg src={urlimagen} alt={nombre} />
                </div>
                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <a className="titulo">
                            {nombre}
                        </a>
                    </Link>
                    <p>
                        {descripcion}
                    </p>
                    <Comentarios>
                        <div>
                            <Imagen src="/static/img/comentario.png" />
                            <p>{comentarios.length} Comentarios</p>
                        </div>
                    </Comentarios>

                    <p>Publicado hace: {formatDistanceToNow(new Date(creado),{locale: es})}</p>
                </div>
            </DescripcionProducto>
            <Votos>
                <div> &#9650; </div>
                <p>{votos}</p>
            </Votos>
        </Producto>
     );
}
 
export default DetallesProducto;