import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Assets/CSS/Cupon.css";
import { useStateContext } from "../Context/StateContext";
import { sendAplyCupon } from "../Services/productInfoServices";
import swal from 'sweetalert';

const Cupon = () => {
  const navigate = useNavigate();

  const { AplyCupon, setAplyCupon, subTotal, setSubTotal, subTotalDescuento, setSubTotalDescuento } = useStateContext(); // Agrega `subTotal` al destructuring

  const handleDevolverClick = () => {
    navigate("/carrito");
  };

  useEffect(() => {
    localStorage.setItem('subTotal', subTotal);
  }, []);
  
  const handleAplyCuponClick = async (e) => {
    e.preventDefault();

    const formCupon = {
      coupon_code: AplyCupon.coupon_code.toString(),
      total_price: subTotal 
    };
    
    console.log("enviadoooooo: ", formCupon);
    const response = await sendAplyCupon(formCupon);
    console.log("recibidooo",response);
  
  
    if (response.concluded===true) {
      setSubTotalDescuento(response.new_total_price);
      console.log("nuevo precio: ",subTotalDescuento); // Agrega una condición para mostrar la alerta solo cuando `conclued` sea `true`
      swal({
        title: "Cupon Redimido exitosamente",
        text: "Ahora tienes un cupon de % de descuento",
        icon: "success",
        button: "Aceptar",
        timer: 4500
      });
      
      
      
    }
    else if(response===400){
      swal({
        title: "El cupon no existe",
        text: "",
        icon: "error",
        button: "Aceptar",
        timer: 4500
      });
    }
    
  };
  
  
  return (
    <div className="background">
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
      <div className="contenido">
        <div className="form">
          <h3>Ingresa tu cupon de descuento</h3>
          <input
            type="text"
            style={{ "--i": 0 }}
            className="text"
            placeholder="Codigo del cupon"
            value={AplyCupon.coupon_code}
            onChange={(e) => setAplyCupon({ ...AplyCupon, coupon_code: e.target.value })}
            required
          />
          <button className="admin-home-button" onClick={handleAplyCuponClick}>
            Crear cupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cupon;