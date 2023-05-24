import React, { useEffect } from 'react';
import { Table, Button, Row, Col, Badge, Alert, ButtonGroup } from 'reactstrap';
import { BsTrash } from "react-icons/bs";

import { useStateContext } from '../Context/StateContext';


const Trolley = () => {

    const { agregarProducto, carrito, setCarrito, setSubTotal, removerProducto } = useStateContext();

    useEffect(() => {
        const calculo = () => {
            setSubTotal(carrito.reduce((obj, cur) => (obj + (cur.item.price) * cur.quantity), 0))
        }
        calculo();
    }, [carrito]);

    return (
        <>
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
                                    Precio por producto
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
                                            <ButtonGroup>
                                                <Col>
                                                    <Button className="primary-button" color="danger" size="sm" onClick={() => setCarrito(agregarProducto(elemento.item, -1, carrito))}>-</Button>
                                                </Col>
                                                <Col>
                                                    <Badge>{elemento.quantity}</Badge>
                                                </Col>
                                                <Col>
                                                    <Button className="primary-button" color="success" size="sm" onClick={() => setCarrito(agregarProducto(elemento.item, 1, carrito))}>+</Button>
                                                </Col>
                                            </ButtonGroup>
                                        </Row>

                                    </td>

                                    <td>
                                        <span>{(elemento.item.price)}</span>
                                    </td>

                                    <td>
                                    <Button className="primary-button" color="danger" size="sm" onClick={() => setCarrito(removerProducto(elemento.item.id, carrito))}>
                                        <BsTrash />
                                    </Button>
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