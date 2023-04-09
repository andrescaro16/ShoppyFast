import React, { useState, useEffect } from "react";
import { getProduct } from '../Services/productInfoServices';
import { Spinner, UncontrolledAlert, Button } from 'reactstrap';
import { FaCat } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import '../dbTemp/products'
import '../Assets/CSS/Global.css'

import { useStateContext } from "../Context/StateContext";


const ProductInfo = () => {

  const { carrito, setCarrito, agregarProducto } = useStateContext();

  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [dato, hayDatos] = useState(false);


  useEffect(() => {
    hayDatos(false);
    const conseguirDatos = async () => {
      setLoad(true);

      const data = await getProduct(id);
        if (data !== 404) {
          setProductInfo(data[0]);
          setLoad(false);

          if (data.length === 1) {
            hayDatos(true);
          }
        }else{
          setLoad(false);
        }
    };
    conseguirDatos();
  }, [id]);

  
  return(
    <div>
    
      {load === false ? (<>
        { 
        
          dato && id ? (
            <>
            <div className="product" key={productInfo.id}>
                <div className="imag">
                    <img src={productInfo.imgURL} alt="img" width="100%" />
                </div>
                <div className="body">
                    <h5>{productInfo.name}</h5>
                    <p>{productInfo.marca}</p>
                    <p>{productInfo.description}</p>
                    <p> <strong>Precio:</strong> {productInfo.price}</p>
                    <p> <strong>Cantidad:</strong> {productInfo.cantidad}</p>
                </div>
                <div className="agregarCar">
                    <Button color="danger" onClick={() => setCarrito(agregarProducto(productInfo, 1, carrito))}>Añadir al carrito</Button>
                </div>
            </div>
            </>) : <UncontrolledAlert color="info">El código no corresponde a ningún producto, por favor ingrese otro. <FaCat/> <TbError404/></UncontrolledAlert>
        }
      </>) :  (<><Spinner color="primary" type="grow">Loading...</Spinner><br /><Spinner color="primary" type="grow">Loading...</Spinner></>)
      }
    </div>
  )
}

export default ProductInfo;