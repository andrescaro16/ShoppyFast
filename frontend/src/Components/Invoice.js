import React, { useEffect } from "react";
import { Button, Card, CardFooter, CardHeader, ListGroup, ListGroupItem, Col, Row, Container } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useStateContext } from "../Context/StateContext";


function Invoice() {
    
    
    const { subTotal, total, dataInvoice } = useStateContext();
    let location = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div>
            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                <Container id="invoice-card-container">
                    <Card id="invoice-card">
                        <CardHeader><h3  style={{textAlign: "center"}}><strong> Shoppy Fast Factura </strong></h3></CardHeader>
                        <CardHeader><h6  style={{textAlign: "center"}}><strong> Cliente </strong></h6></CardHeader>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col xs="6" style={{textAlign: "left"}}>Nombre</Col>
                                    <Col xs="6" style={{textAlign: "right"}}>{dataInvoice.user_name}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col xs="6" style={{textAlign: "left"}}>Cedula</Col>
                                    <Col xs="6" style={{textAlign: "right"}}>{dataInvoice.document_id}</Col>
                                </Row>
                            </ListGroupItem>

                        </ListGroup>
                        <CardHeader><h6  style={{textAlign: "center"}}><strong> Productos </strong></h6></CardHeader>
                        <CardHeader>
                            <Row>
                                <Col xs="6" style={{textAlign: "left"}}><b>Nombre</b></Col>
                                <Col xs="4" style={{textAlign: "right"}}><b>Cantidad</b></Col>
                                <Col xs="2" style={{textAlign: "right"}}><b>Precio</b></Col>
                            </Row>
                        </CardHeader>

                        <ListGroup >
                            {dataInvoice.products.map(producto => (
                                <ListGroupItem key={producto.id}>
                                    <Row>
                                        <Col xs="8" style={{textAlign: "left"}}>{producto.name}</Col>
                                        <Col xs="1" style={{textAlign: "right"}}>{producto.cantidad}</Col>
                                        <Col xs="3" style={{textAlign: "right"}}>{producto.price}</Col>
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
                    <Button className="primary-button" color="danger" style={{ textDecoration: 'none' }} > Regresar al home </Button>
            </Link>
        </div>
    )
}

export default Invoice;