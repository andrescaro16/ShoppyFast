import React, { Component, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getAllProduct } from "../Services/productInfoServices";


//Retorna todos los productos
function AllProducts({carrito, setCarrito, agregarProducto}){
  const [productsList, setProductsList] = useState([]);
  //Solicitud a la API. Se ejecuta con cada cambio de id (Segundo argumento).
  useEffect(() => {
    const conseguirDatos = async () => {
      //Indicamos que ya se está cargando información
      const data = await getAllProduct()
      setProductsList(data)
    };
    conseguirDatos();
  }, []);


    return(
        <React.Fragment>
            <div className="products">
                {productsList.map(prod => (
                  <div className="product" key={prod.id}>
                    <div className="imag">
                      <img src={prod.imgURL} alt="img" width="100%" />
                    </div>
                    <div className="body">
                      <h5>{prod.name}</h5>
                      <p>{prod.marca}</p>
                      <p>{prod.description}</p>
                      <p> <strong>Precio:</strong> {prod.price}</p>
                      <p> <strong>Cantidad:</strong> {prod.cantidad}</p>
                    </div>
                    <div className="agregarCar">
                      <Button color="danger" onClick={() => setCarrito(agregarProducto(prod, 1, carrito))}>Añadir al carrito</Button>
                    </div>
                  </div>
                ))}
            </div>
        </React.Fragment>
    );

}


export default AllProducts;