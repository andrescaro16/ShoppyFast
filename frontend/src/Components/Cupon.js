import React from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/Cupon.css";
import { useStateContext } from "../Context/StateContext";
import { sendCupon } from "../Services/productInfoServices";
import swal from 'sweetalert';

const Cupon = () => {

  const navigate = useNavigate();
  const { tokenId,codigoCupon, porcentajeDescuento, setCodigoCupon, setPorcentajeDescuento } = useStateContext();
 
  const handleDevolverClick = () => {
    navigate("/administrador/home");
  };
  const handleCreateCuponClick = async (e) => {
    e.preventDefault();
    const formCupon = {
      coupon_code: codigoCupon,
      discount: parseInt(porcentajeDescuento)
    }
    const response = await sendCupon(formCupon, tokenId);
    if (response.concluded === true && !isNaN(formCupon.discount)){
      swal({
        title: "Cupon creado exitosamente",
        text:`cupón ${formCupon.coupon_code} creado equivalente a un ${formCupon.discount}% de descuento`,
        icon: "success",
        button:"Aceptar",
        timer: "4500"
      });
    }
    else if(response.concluded === true && isNaN(formCupon.discount)){
      swal({
        title: "error",
        text: "debes ingresar el valor de descuento",
        icon: "error",
        button:"Aceptar",
        timer: "3500"
      });
    }
    else if(response.concluded === true && formCupon.coupon_code===''){
      swal({
        title: "error",
        text: "debes ingresar el codigo del cupon",
        icon: "error",
        button:"Aceptar",
        timer: "3500"
      });
    }
    else if (!formCupon.coupon_code || !formCupon.discount) {
      swal({
        title: "Error",
        text: "Debes completar todos los campos",
        icon: "error",
        button: "Aceptar",
        timer: 3500
      });
    }
    else{
      swal({
        title: "error",
        text: "error al crear el cupon intentalo de nuevo",
        icon: "error",
        button:"Aceptar",
        timer: "3500"
      });
    }
    
  };


  return (
    <div className="background">
       <button className="primary-button" onClick={handleDevolverClick}  style={{
          position: "fixed",
          top: 120,
          left: 60,
          backgroundColor: "#DB1A1A"
        }}>
        Atras
      </button>
      <div className="contenido">
        <div className="form">
          <h3>Nuevo cupon</h3>
         
          <input
            type="text"
            style={{ "--i": 0 }}
            className="text"
            placeholder="Codigo del cupon"
            value={codigoCupon}
            onChange={(e) => setCodigoCupon(e.target.value)}
            required
          />
         <input
          type="text"
          style={{ "--i": 1 }}
          className="text"
          placeholder="Porcentaje de descuento"
          value={porcentajeDescuento}
          onChange={(e) => {
            const inputValue = e.target.value;
            const numericValue = inputValue.replace(/\D/g, ""); 
            setPorcentajeDescuento(numericValue);
          }}
          required
        />

          <button className="admin-home-button" onClick={handleCreateCuponClick}>
          Crear cupon
        </button>

        </div>
      </div>
    </div>
  );
};

export default Cupon;