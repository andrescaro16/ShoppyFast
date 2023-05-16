import React from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/Cupon.css";

const Cupon = () => {

  const navigate = useNavigate();
  
  const handleCreateCuponClick = () => {
    navigate("/administrador/home/cupon");
  };

  return (
    <div className="background">
      <div className="contenido">
        <div className="form">
          <h3>Ingresa cupon</h3>
          <input type="text" style={{ "--i": 0 }} className="text" placeholder="Codigo del cupon" />
          <input type="password" style={{ "--i": 1 }} className="text" placeholder="Porcentaje de descuento" />

          <button className="admin-home-button" onClick={handleCreateCuponClick}>
          Ingresar
        </button>

         
        </div>
      </div>
    </div>
  );
};

export default Cupon;