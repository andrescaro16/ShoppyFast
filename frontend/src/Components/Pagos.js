import React, { useState } from "react";
import "../Assets/CSS/Pagos.css";
import { ListGroup, ListGroupItem, Col, Row, CardHeader, Card } from 'reactstrap'

const Pagos = ({ carrito, total }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(carrito[0]);

  const handleLoginFormSubmit = (event) => {
    event.preventDefault(); // previene que se refresque la página

    // añadir validar el usuario y contraseña

    setIsLoggedIn(true); // marca al usuario como conectado
  };

  return (
    <React.Fragment>
      {isLoggedIn ? (
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
                            <Col xs="6" style={{textAlign: "right"}}>NumTotal</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col xs="6" style={{textAlign: "left"}}><b>TOTAL</b></Col>
                            <Col xs="6" style={{textAlign: "right"}}>NumTotal*1.19</Col>
                        </Row>
                    </ListGroupItem>

                    </ListGroup>

                </Card>
            </div>
            <div style={{ paddingTop: "50px", justifyContent: "center", justifyItems: "center", display: "flex" }}>
                <Card style={{width: '50rem'}}>
                    <CardHeader><h4><strong>Mi billetera</strong></h4></CardHeader>
                    <CardHeader>
                        <Row>
                            <Col xs="6" style={{textAlign: "left"}}><b>Sección</b></Col>
                            <Col xs="6" style={{textAlign: "right"}}><b>Valor</b></Col>
                        </Row>
                    </CardHeader>
                    <ListGroupItem>
                        <Row>
                            <Col xs="6" style={{textAlign: "left", padding:"20px"}}>Saldo Disponible</Col>
                            <Col xs="6" style={{textAlign: "right", padding:"20px"}}>NumDisponible</Col>
                        </Row>
                    </ListGroupItem>
                </Card>
            </div>
            <div style={{margin: "50px"}}>
                <ListGroupItem>
                    <Row>
                        <Col xs="12" style={{textAlign: "center"}}>
                        <button style={{ backgroundColor: "#00a1c6", color: "white", padding: "10px 20px", borderRadius: "5px" }}>Confirmar pago</button>
                        </Col>
                    </Row>
                </ListGroupItem>
            </div>
        </div>
      ) : (
        <div class="form-wrapper">
          <div class="form-container">
            <h4>Banco</h4>
            <form onSubmit={handleLoginFormSubmit}>
              <div class="mb-3">
                <label for="inputUsername" class="form-label">
                  Nombre de usuario
                </label>
                <input type="text" class="form-control" id="inputUsername" />
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">
                  Contraseña
                </label>
                <input type="password" class="form-control" id="inputPassword" />
              </div>
              <button type="submit" class="btn btn-primary">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

<<<<<<< HEAD
export default Pagos;
=======
export default Pagos;
>>>>>>> 77bbecabaf4bb5e7dcd3d70a6f91b229d1c0c8e7
