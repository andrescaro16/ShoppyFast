import React, { useEffect } from "react";
import "../Assets/CSS/Pagos.css";
import { ListGroup, ListGroupItem, Col, Row, CardHeader, Card } from 'reactstrap'
import {  confirmPurchase, calculateTotal } from '../Services/productInfoServices';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { useStateContext } from "../Context/StateContext";


const Pagos = () => {

    const { carrito, subTotal, setTotal, total, userValidation, userPurchase } = useStateContext();

    
    let navigate = useNavigate();
    useEffect(() => {
        const getTotalIva = async () => {
            setTotal(await calculateTotal(subTotal));
        };
        getTotalIva();
    }, []);



    const confirmation = async (event) => {
        event.preventDefault(); // previene que se refresque la página

        try {
            const resultadoTransaccion = await confirmPurchase(userPurchase);

            setTimeout(() => {
                if (resultadoTransaccion.result === 'correct') {
                    const messageSuccess = document.getElementById('message-success');
                    messageSuccess.style.display = 'block';
            
                    setTimeout(() => {
                        navigate('/factura/formulario');
                    }, 3500);
                }else{
                    throw new Error("Transacción Fallida");
                }
            }, 1500);

        } catch (error) {
            const messageFailed = document.getElementById('message-failed');
            messageFailed.style.display = 'block';
            
            setTimeout(() => {
              navigate('/carrito');
            }, 3500);
        }
    };

  return (
    <React.Fragment>

        <div className="form-wrapper">
            <div class="form-container">
                
                <h1>Resumen de compra</h1>

                {/* Resumen carrito */}
                <section>
                    <div style={{ paddingTop: "50px", justifyContent: "center", justifyItems: "center", display: "flex" }}>
                        <Card style={{width: '50rem'}}>
                            <CardHeader><h3><strong>Carrito</strong></h3></CardHeader>
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
                                    <Col xs="6" style={{textAlign: "left"}}><b>Subtotal</b></Col>
                                    <Col xs="6" style={{textAlign: "right"}}>{subTotal}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col xs="6" style={{textAlign: "left"}}><b>Total</b></Col>
                                    <Col xs="6" style={{textAlign: "right"}}>{total}</Col>
                                </Row>
                            </ListGroupItem>

                            </ListGroup>

                        </Card>
                    </div>
                </section>
                

                {/* Resumen compra */}
                <section>
                    <div >
                        
                        <div>
                            <div style={{ paddingTop: "25px", justifyContent: "center", justifyItems: "center", display: "flex" }}>
                                <Card style={{width: '50rem'}}>
                                    <CardHeader><h3><strong>Pago</strong></h3></CardHeader>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="7" style={{textAlign: "left"}}><b>Detalles</b></Col>
                                        </Row>
                                    </CardHeader>

                                    {(userValidation.validPurchase) ? 

                                        (<><ListGroup >

                                            <ListGroupItem>
                                                <Row style={{ justifyContent: "space-between" }}>
                                                    <Col xs="7" style={{textAlign: "left"}}>Saldo disponible en billetera</Col>
                                                    <Col xs="3" style={{textAlign: "right", color:"green"}}>{userValidation.availableBalance}</Col>
                                                </Row>
                                                <Row style={{ justifyContent: "space-between" }}>
                                                    <Col xs="7" style={{textAlign: "left"}}>Transaccion a confirmar</Col>
                                                    <Col xs="3" style={{textAlign: "right", color:"red"}}>-{total}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            
                                            <ListGroupItem>
                                                <Row>
                                                    <Col style={{textAlign: "center"}}><b>Transaccion Válida</b></Col>
                                                </Row>
                                            </ListGroupItem>

                                        </ListGroup></>)
                                        :
                                        (<><ListGroup >
                                            <ListGroupItem>
                                                <Row style={{ justifyContent: "space-between" }}>
                                                    <Col xs="7" style={{textAlign: "left"}}>Saldo disponible en billetera</Col>
                                                    <Col xs="3" style={{textAlign: "right", color:"red"}}>{userValidation.availableBalance}</Col>
                                                </Row>
                                                <Row style={{ justifyContent: "space-between" }}>
                                                    <Col xs="7" style={{textAlign: "left"}}>Transaccion a confirmar</Col>
                                                    <Col xs="3" style={{textAlign: "right", color:"red"}}>-{total}</Col>
                                                </Row>
                                            </ListGroupItem>
                                            
                                            <ListGroupItem>
                                                <Row>
                                                    <Col style={{textAlign: "center"}}><b>Transaccion Inválida</b></Col>
                                                </Row>
                                            </ListGroupItem>

                                        </ListGroup></>)
                                    }
                                </Card>
                            </div>

                            {(userValidation.validPurchase) ? 
                                (<>
                                <p id="message-success" style={{textAlign:"center", color:"green", marginTop: "40px", display: "none"}}>Transaccion Realizada Éxitosamente</p>
                                <p id="message-failed" style={{textAlign:"center", color:"red", marginTop: "40px", display: "none"}}>Transaccion Fallida</p>
                                <button id="confirmar-pago" type="submit" class="btn btn-primary" style={{ backgroundColor: "#00a1c6", border: 0, margin: "30px"}} onClick={confirmation}>
                                    Confirmar pago
                                </button>
                                </>)
                                :
                                (<>
                                <Link to={"/carrito"}>
                                    <button type="submit" class="btn btn-primary" style={{ backgroundColor: "#00a1c6", border: 0, margin: "40px"}}>
                                        Regresar al carrito
                                    </button>
                                </Link>
                                </>)
                            }
                        </div>
                            
                    </div>
                </section>

            </div>
        </div>

    </React.Fragment>
  );
};

export default Pagos;