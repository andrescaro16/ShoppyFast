import React from "react";
import { Button, Card, CardFooter, CardHeader, ListGroup, ListGroupItem, Col, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";

import { useStateContext } from "../Context/StateContext";


function Invoice() {

    const { userDataTemp, subTotal, total, carrito } = useStateContext();


    return (
        <div>
            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                <Container style={{ marginTop: '60px', width: 'auto', marginTop: '60px' }}>
                    <Card style={{ width: '28rem' }} >
                        <CardHeader><h3  style={{textAlign: "center"}}><strong> Shoppy Fast Factura </strong></h3></CardHeader>
                        <CardHeader><h6  style={{textAlign: "center"}}><strong> Cliente </strong></h6></CardHeader>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col xs="6" style={{textAlign: "left"}}>Nombre</Col>
                                    <Col xs="6" style={{textAlign: "right"}}>{userDataTemp.name}<span> </span>{userDataTemp.lastname}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col xs="6" style={{textAlign: "left"}}>Cedula</Col>
                                    <Col xs="6" style={{textAlign: "right"}}>{userDataTemp.document_id}</Col>
                                </Row>
                            </ListGroupItem>

                        </ListGroup>
                        <CardHeader><h6  style={{textAlign: "center"}}><strong> Productos </strong></h6></CardHeader>
                        <CardHeader>
                            <Row>
                                <Col xs="6" style={{textAlign: "left"}}><b>Nombre</b></Col>
                                <Col xs="6" style={{textAlign: "right"}}><b>Precio</b></Col>
                            </Row>
                        </CardHeader>

                        <ListGroup >
                            {carrito.map(producto => (
                                <ListGroupItem key={producto.item.id}>
                                    <Row>
                                        <Col xs="6" style={{textAlign: "left"}}>{producto.item.name}</Col>
                                        <Col xs="6" style={{textAlign: "right"}}>{producto.item.price}</Col>
                                    </Row>

                                </ListGroupItem>))
                            }
                        </ListGroup>
                        <CardFooter>
                            <Row>
                                <Col xs="6" style={{textAlign: "left"}}><strong> SubTotal </strong></Col>
                                <Col xs="6" style={{textAlign: "right"}}>{subTotal}</Col>
                            </Row>
                        </CardFooter>
                        <CardFooter>
                            <Row>
                                <Col xs="6" style={{textAlign: "left"}}><strong> IVA 19% </strong></Col>
                                <Col xs="6" style={{textAlign: "right"}}>{total-subTotal}</Col>
                            </Row>
                        </CardFooter>
                        <CardFooter>
                            <Row>
                                <Col xs="6" style={{textAlign: "left"}}><strong> Total </strong></Col>
                                <Col xs="6" style={{textAlign: "right"}}>{total}</Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Container>
            </section>
            <Link to="/" style={{ display: "flex", marginTop: '40px', marginBottom: '40px', width: "auto", justifyContent: "center", textDecoration: "none" }}>
                    <Button color="danger" style={{ textDecoration: 'none' }} > Regresar al home </Button>
            </Link>
        </div>
    )
}

export default Invoice;