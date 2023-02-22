import React, { useState, useEffect } from "react";
import { getProduct } from '../Services/productInfoServices';
import { useParams } from 'react-router-dom';
import '../dbTemp/products'
import productsList from "../dbTemp/products";
import '../Assets/CSS/Product.css'
import ProductCard from "./ProductCard";


const ProductInfo = () => {

  // Hook para obtener el id de la URL
  const { id } = useParams();
  // Hook para el estado de buscando producto o no
  const [load, setLoad] = useState(false);
  // Guardamos la información del producto con el id ingresado en caso de encontrarse en la llamada API
  const [productInfo, setProductInfo] = useState({});
  // Determinamos si se encontró un producto con dicho id
  const [dato, hayDatos] = useState(false);

  //Solicitud a la API. Se ejecuta con cada cambio de id (Segundo argumento).
  useEffect(() => {
    //Indicamos que no hay datos por el momento
    hayDatos(false);
    const conseguirDatos = async () => {
        //Indicamos que ya se está cargando información
        setLoad(true);
        const data = await getProduct(id);
        if (data) {
          //Guardamos datos del producto en el estado de productInfo
          setProductInfo(data[0]);
          //Ya no se está cargando información
          setLoad(false);
          if (data.length === 1) {
            //Indicamos que ya hay datos disponibles
            hayDatos(true);
          }
        }
    };
    conseguirDatos();
  }, [id]);


  const product = productsList.find(product => product.id === parseInt(id));

  return(
    <React.Fragment>
      {product ? (
        <div className="products">
          <ProductCard product={product} key={product.id} />
        </div>
      ) : (
        <label style={{ color: "red", display: "block", margin: "10px", textAlign:"center"}}>  </label> //No se encontró el producto
      )}
    </React.Fragment>
  );
}


export default ProductInfo;