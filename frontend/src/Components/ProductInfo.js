import React, { useState, useEffect } from "react";
import { getProduct } from '../Services/productInfoServices';
import { Spinner, UncontrolledAlert } from 'reactstrap';
import { FaCat } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
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
        if (data !== 404) {
          //Guardamos datos del producto en el estado de productInfo
          setProductInfo(data[0]);
          //Ya no se está cargando información
          setLoad(false);

          if (data.length === 1) {
            //Indicamos que ya hay datos disponibles
            hayDatos(true);
          }
        }else{
          setLoad(false);
        }
    };
    conseguirDatos();


  }, [id]);

  //const product = productsList.find(product => product.id === parseInt(id));
  console.log("dasfdfasdfasdfasdf")
  console.log(dato)
  console.log(id)
  
  return(
    <div>
    
      {load === false ? (<>
        { 
        
          dato && id ? (
            <>
            <div className="products"><ProductCard {...productInfo} /></div>
            </>) : <UncontrolledAlert color="info">El código no corresponde a ningún producto, por favor ingrese otro. <FaCat/> <TbError404/></UncontrolledAlert>
        }
      </>) :  (<><Spinner color="primary" type="grow">Loading...</Spinner><br /><Spinner color="primary" type="grow">Loading...</Spinner></>)
      }
    </div>
  )
}

export default ProductInfo;