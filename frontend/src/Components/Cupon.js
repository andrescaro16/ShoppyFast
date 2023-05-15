import React from "react";
import "../Assets/CSS/Cupon.css";

const Cupon = () => {
  return (
    <div className="background">
      <div className="contenido">
        <div className="form">
          <h3>Nuevo cupon</h3>
          <input type="text" style={{ "--i": 0 }} className="text" placeholder="Codigo del cupon" />
          <input type="password" style={{ "--i": 1 }} className="text" placeholder="Porcentaje de descuento" />

          <input className="boton" type="submit" value="Crear cupon" />

         
        </div>
      </div>
    </div>
  );
};

export default Cupon;