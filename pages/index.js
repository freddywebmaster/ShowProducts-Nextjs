import React, { useEffect, useState } from "react";
import DetallesProducto from "../components/layout/DetallesProducto";
import Layout from "../components/layout/Layout";
import firebase from "../firebase";

const Home = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = () => {
    firebase.db
      .collection("productos")
      .orderBy("creado", "desc")
      .onSnapshot((query) => {
        const resultado = [];
        query.forEach((doc) => {
          resultado.push({ ...doc.data(), id: doc.id });
        });
        setProductos(resultado);
      });
  };

  useEffect(() => {
    obtenerProductos();
  }, []);
  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {
              productos.map(producto=>(
                <DetallesProducto key={producto.id} producto={producto}/>
              ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
