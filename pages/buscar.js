import React, { useEffect, useState} from 'react'
import Layout from '../components/layout/Layout';
import {useRouter} from 'next/router';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

const BuscarPage = () => {

  const router = useRouter();
  const [resultado, setResultado] = useState([]);

  const { query: { q } } = router;

  const {productos} = useProductos('creado');

  useEffect(()=>{
    const busqueda = q.toLowerCase();
    const filtro = productos.filter(producto=>{
      return(
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    setResultado(filtro);
  },[q, productos]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                  {resultado.map(producto => (
                      <DetallesProducto
                          key={producto.id}
                          producto={producto}
                      />
                  ))}
              </ul>
            </div>
        </div>
      </Layout>
    </div>
   );
}
 
export default BuscarPage;