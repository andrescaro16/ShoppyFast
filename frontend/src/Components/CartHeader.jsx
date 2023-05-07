import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from 'reactstrap';
import { BsFillCartFill, BsFillCartXFill } from "react-icons/bs";
import { useStateContext } from "../Context/StateContext";


function CartHeader() {

    const { carrito, setCarrito, subTotal, vaciarCarrito } = useStateContext();

  return (
    <div>

        <br />

        <div className='encabezado_inventario'>
            <Link to="/">
                <Button color="danger">Volver</Button>
            </Link>
        </div>

        <br />

        <div className='encabezado_inventario' >

            <div className="encabezado-precio">
                <BsFillCartFill />
                <span><b>Precio Total</b>{subTotal}</span>
            </div>

            <ButtonGroup>
                <div>
                    <Button color="primary" >Cupón de descuento</Button>
                </div>

                <Link to="/pago/transaccion" >
                    <Button color="primary">Realizar pago</Button>
                </Link>
            </ButtonGroup>
        </div>

        <div className='encabezado_inventario' >
            <Button color="danger" size="sm" onClick={() => setCarrito(vaciarCarrito(carrito))}> <BsFillCartXFill /> Vaciar Carrito</Button>
        </div>
    </div>
  )
}

export default CartHeader;