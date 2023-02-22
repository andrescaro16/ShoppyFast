import React, { Component } from "react";
import '../dbTemp/products'
import productsList from "../dbTemp/products"
import ProductCard from "./ProductCard";

//Retorna todos los productos
function AllProducts(){

    return(
        <React.Fragment>
            <div className="products">
                {productsList.map(prod => (
                <ProductCard product={prod} />
                ))}
            </div>
        </React.Fragment>
    );

}


export default AllProducts;