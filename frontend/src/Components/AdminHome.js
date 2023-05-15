import "../Assets/CSS/AdminHome.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleInventarioClick = () => {
    navigate("/administrador/inventario");
  };

  const handleReportesClick = () => {
    navigate("/administrador/home/analitica");
  };

  const handleCuponClick = () => {
    navigate("/administrador/home/cupon");
  };

  return (
    
    <div className="admin-home-container">

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