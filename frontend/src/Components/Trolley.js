import React from 'react';
import { Link } from "react-router-dom";
import { Container, Table, Button, Row, Col, Badge, Alert } from 'reactstrap';
import '../Assets/CSS/Trolley.css';
import { BsFillCartFill, BsFillCartXFill } from "react-icons/bs";
import { vaciarCarrito } from './TrolleyActions';

const Trolley = ({ agregarProducto, carrito, setCarrito }) => {

    return (
        <>
            <div className='encabezado_inventario' >

                <Link to="/" style={{'paddingRight': "150px", float: "left"}}>
                    <Button color="danger">Volver</Button>
                </Link>

                <div style={{'padding-right': "860px", float: "left"}}>
                    <BsFillCartFill />
                    <span><b>Precio Total</b></span>
                </div>

                <div style={{'padding-right': "100px", float: "left" }}>
                    <Button color="primary" >Cupón de descuento</Button>
                </div>

                <div>
                    <Button color="primary">Crear Factura</Button>
                </div>
            </div>

            <div className='encabezado_inventario' style={{'padding-left': "220px", 'paddingBottom': "0px"}}>
                <Button color="danger" size="sm" onClick={() => setCarrito(vaciarCarrito(carrito))}> <BsFillCartXFill /> Vaciar Carrito</Button>
            </div>



            <React.Fragment>
                <div className='container_table'>
                    <Table className='tabla_carro'>
                        <thead>
                            <tr>
                                <th>
                                    Imagen del producto
                                </th>
                                <th>
                                    Nombre Producto
                                </th>
                                <th>

                                    <span> Cantidad </span> <span>de</span> <span>Productos </span>
                                </th>
                                <th>

                                    <span> Cantidad </span> <span>disponible de</span> <span>Producto</span>
                                </th>
                                <th>
                                    Precio por producto
                                </th>
                                <th>
                                    Precio total producto
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>{carrito.length > 0 ? (<>{carrito.map(elemento => (
                            <tbody key={"body" + elemento.item.id}>
                                <tr>
                                    <th scope="row">
                                        <img src={elemento.item.imgURL} alt="img" width="100px" />
                                    </th>
                                    <td>
                                        <span>{elemento.item.name}</span>
                                    </td>
                                    <td>
                                        <Row key={elemento.item.id}>
                                            <Col>
                                                <Button color="danger" size="sm" onClick={() => setCarrito(agregarProducto(elemento.item, -1, carrito))}>-</Button>
                                            </Col>

                                            <Col>
                                                <Badge>{elemento.quantity}</Badge>
                                            </Col>
                                            <Col>
                                                <Button color="success" size="sm" onClick={() => setCarrito(agregarProducto(elemento.item, 1, carrito))}>+</Button>
                                            </Col>
                                        </Row>

                                    </td>
                                    <td>
                                    <span>{(elemento.item.cantidad)}</span>
                                    </td>
                                    <td>
                                        <span>{(elemento.item.price)}</span>
                                    </td>
                                    <td>
                                        <span>{(elemento.item.price * elemento.quantity)}</span>
                                    </td>
                                </tr>

                            </tbody>
                        )
                        )
                        }   
                        </>) : <tr><td colspan="6"><Alert color="info">Carrito vacío</Alert></td></tr>}

                    </Table>


                </div>

            </React.Fragment >
        </>)
}


export default Trolley
