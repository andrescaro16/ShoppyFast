import "../Assets/CSS/AdminHome.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/AdminHome.css";
import Background from "./Background";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleInventarioClick = () => {
    navigate("/administrador/home/Inventory");
  };

  const handleReportesClick = () => {
    navigate("/administrador/home/analitica");
  };

  const handleCuponClick = () => {
    navigate("/administrador/home/cupon");
  };

  const handleDevolverClick = () => {
    navigate("/administrador");
  };

  return (
    
    <div className="admin-home-container">
      <button className="primary-button" onClick={handleDevolverClick}  style={{
          position: "fixed",
          top: 120,
          left: 60,
          backgroundColor: "#DB1A1A"
        }}>
        Atras
      </button>
      <h1 className="admin-home-title">Bienvenido al Panel de Administración</h1>
      <div className="admin-home-buttons">
        <button className="admin-home-button" onClick={handleInventarioClick}>
          Inventario
        </button>
        <button className="admin-home-button" onClick={handleReportesClick}>
          Reportes
        
        </button>
        <button className="admin-home-button" onClick={handleCuponClick}>
          Crear cupon
        </button>
      </div>
    </div>

  );
};

export default AdminHome;