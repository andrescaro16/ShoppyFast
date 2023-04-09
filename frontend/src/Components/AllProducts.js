import React, { useEffect, useState } from "react";
import { getAllProduct } from "../Services/productInfoServices";
import RecipeReviewCard from  './ProductCard';


function AllProducts(){

  const [productsList, setProductsList] = useState([]);
  
  useEffect(() => {
    const conseguirDatos = async () => {
      const data = await getAllProduct()
      setProductsList(data)
    };
    conseguirDatos();
  }, []);


    return(
        <React.Fragment>

          <div className='products-container'>
            {productsList.map(product =>(
              <RecipeReviewCard product={product} />
            ))}
          </div>
          
        </React.Fragment>
    );
}


export default AllProducts;