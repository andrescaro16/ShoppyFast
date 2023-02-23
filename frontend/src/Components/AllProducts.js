import React, { Component, useEffect, useState } from "react";
import '../dbTemp/products'
import { getAllProduct } from "../Services/productInfoServices";
// import productsList from "../dbTemp/products"
import ProductCard from "./ProductCard";

//Retorna todos los productos
function AllProducts(){

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
                <ProductCard {...prod} />
                ))}
            </div>
        </React.Fragment>
    );

}


export default AllProducts;