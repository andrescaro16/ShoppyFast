import React, { useEffect, useState } from "react";
import { getAllProduct } from "../Services/productInfoServices";
import RecipeReviewCard from  './ProductCard';
import { useLocation } from "react-router-dom";

import { useStateContext } from "../Context/StateContext";


function AllProducts(){
    
    const { searchTerm } = useStateContext();
    const [productsList, setProductsList] = useState([]);
    let location = useLocation();
    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
  
    
    useEffect(() => {
        const conseguirDatos = async () => {
            const data = await getAllProduct();
            if(searchTerm.length < 3){
                setProductsList(data);
            }else{
                const filteredProducts = [];
                for (let i = 0; i < data.length && filteredProducts.length < 4; i++) {
                    if(data[i].name.toLowerCase().includes(searchTerm)){
                        filteredProducts.push(data[i]);
                    }
                }
                setProductsList(filteredProducts);
            }
        };
        conseguirDatos();
    }, [ searchTerm ]);


    return(
        <React.Fragment>
            <div className='products-container'>
                {productsList.length > 0 ? productsList.map((product, i) =>(
                    <RecipeReviewCard key={i} product={product} />
                )) : <p className="not-found-text">Producto no encontrado</p>}
            </div>
        </React.Fragment>
    );
}


export default AllProducts;