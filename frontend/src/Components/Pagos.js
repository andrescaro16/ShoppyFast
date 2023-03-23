import React, { useEffect } from "react";
import "../Assets/CSS/Pagos.css";
import { ListGroup, ListGroupItem, Col, Row, CardHeader, Card } from 'reactstrap'
import { calculateTotal } from '../Services/productInfoServices';
import { Link } from 'react-router-dom';

const Pagos = ({ carrito, subTotal }) => {
  
  let total = useEffect(() => {
    const getTotalIva = async () => {
      return await calculateTotal(subTotal);
    };
    getTotalIva();
  }, [subTotal]);

  return (
    <React.Fragment>
        <div>
            <div style={{ paddingTop: "50px", justifyContent: "center", justifyItems: "center", display: "flex" }}>
                <Card style={{width: '50rem'}}>
                    <CardHeader><h4><strong>Resumen de compra</strong></h4></CardHeader>
                    <CardHeader>
                        <Row>
                            <Col xs="7" style={{textAlign: "left"}}><b>Producto</b></Col>
                            <Col xs="2" style={{textAlign: "left"}}><b>Cantidad</b></Col>
                            <Col xs="3" style={{textAlign: "right"}}><b>Precio</b></Col>
                        </Row>
                    </CardHeader>

                    <ListGroup >
                        {carrito.map(producto => (
                            <ListGroupItem key={producto.item.id}>
                                <Row style={{ justifyContent: "space-between" }}>
                                    <Col xs="7" style={{textAlign: "left"}}>{producto.item.name}</Col>
                                    <Col xs="2" style={{textAlign: "center"}}>{producto.quantity}</Col>
                                    <Col xs="3" style={{textAlign: "right"}}>{producto.item.price}</Col>
                                </Row>

                            </ListGroupItem>))
                        }

                    <ListGroupItem>
                        <Row>
                            <Col xs="6" style={{textAlign: "left"}}><b>SUBTOTAL</b></Col>
                            <Col xs="6" style={{textAlign: "right"}}>{subTotal}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col xs="6" style={{textAlign: "left"}}><b>TOTAL</b></Col>
                            <Col xs="6" style={{textAlign: "right"}}>{total}</Col>
                        </Row>
                    </ListGroupItem>

                    </ListGroup>

                </Card>
            </div>
            <div style={{margin: "50px"}}>
                <ListGroupItem>
                    <Row>
                        <Col xs="12" style={{textAlign: "center"}}>
                          <Link to="/pago/transaccion">
                            <button style={{ backgroundColor: "#00a1c6", color: "white", padding: "10px 20px", borderRadius: "5px" }}>Confirmar pago</button>
                          </Link>
                        </Col>
                    </Row>
                </ListGroupItem>
            </div>
        </div>
    </React.Fragment>
  );
};

export default Pagos;