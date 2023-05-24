import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from 'reactstrap';
import { BsFillCartFill, BsFillCartXFill } from "react-icons/bs";
import { useStateContext } from "../Context/StateContext";
import { useNavigate } from "react-router-dom";


function CartHeader() {

    const { carrito, setCarrito, subTotal, vaciarCarrito } = useStateContext();
    const navigate = useNavigate();

    const handleCuponClick = () => {
        navigate("/cupon");
    };


    return (
        <div>
            <br />

            <div className='encabezado_inventario'>
                <Link to="/">
                    <Button className="primary-button" color="danger">Volver</Button>
                </Link>
            </div>

            <br />

            <div className='encabezado_inventario' >

                <div className="encabezado-precio">
                    <BsFillCartFill />
                    <span><b>Precio Total</b>{subTotal}</span>
                </div>

            </div>

            <ButtonGroup className='encabezado_inventario'>
                    <div>
                        <Button className="primary-button" color="primary" onClick={handleCuponClick}>Cupón de descuento</Button>
                    </div>

                    <Link to="/pago/transaccion" >
                        <Button className="primary-button" color="primary">Realizar pago</Button>
                    </Link>
            </ButtonGroup>

            <div className='encabezado_inventario' >
                <Button className="primary-button" color="danger" size="sm" onClick={() => setCarrito(vaciarCarrito(carrito))}> <BsFillCartXFill /> Vaciar Carrito</Button>
            </div>
        </div>
    )
}

export default CartHeader;