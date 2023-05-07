import React, { useState, useEffect } from "react";
import { getProduct } from '../Services/productInfoServices';
import { Spinner, UncontrolledAlert } from 'reactstrap';
import { FaCat } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import '../Assets/CSS/Global.css'
import RecipeReviewCard from  './ProductCard';



const ProductInfo = () => {


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
            <div className='products-container'>
                <RecipeReviewCard product={productInfo} />
            </div>
            </>) : <UncontrolledAlert color="info">El código no corresponde a ningún producto, por favor ingrese otro. <FaCat/> <TbError404/></UncontrolledAlert>
        }
      </>) :  (<><Spinner color="primary" type="grow">Loading...</Spinner><br /><Spinner color="primary" type="grow">Loading...</Spinner></>)
      }
    </div>
  )
}

export default ProductInfo;