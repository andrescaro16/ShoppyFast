import React from 'react';
import RecipeReviewCard from './InventoryCard';
import { useStateContext } from "../Context/StateContext";
import { getAllProduct } from "../Services/productInfoServices";
import { useEffect, useState } from "react";
import InventoryIcon from '@mui/icons-material/Inventory'
import { useNavigate } from "react-router-dom";

function Inventory() {
    const { searchTerm } = useStateContext();
    const [productsList, setProductsList] = useState([]);

    const navigate = useNavigate();

    const handleCreateProductClick = () => {
      navigate("/administrador/home/inventory/createProduct");
    };

    const handleDevolverClick = () => {
      navigate("/administrador/home");
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAllProduct();
          setProductsList(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
  


    return (
      <div className='inventory'>
        <button
          className="primary-button"
          onClick={handleDevolverClick}
          style={{
            position: "fixed",
            top: 120,
            left: 60,
            backgroundColor: "#DB1A1A"
          }}
        >
          Atras
        </button>
        <button
          className="primary-button"
          onClick={handleCreateProductClick}
          style={{
            position: "fixed",
            top: 120,
            right: 60,
            backgroundColor: "#577559"
          }}
        >
          + Crear producto
        </button>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <InventoryIcon
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: "10px"
            }}
          />
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: "40px"
            }}
          >
            Inventario
          </h1>
        </div>
        <div className='products-container'>
          {productsList.map((product, i) => (
            <RecipeReviewCard key={i} product={product} />
          ))}
        </div>
      </div>
    );
  }


export default Inventory;