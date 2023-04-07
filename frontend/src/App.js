import React, { useState, useEffect } from 'react';
import './Assets/CSS/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { bankLogin } from './Services/productInfoServices';

//Import components
import Search from './Components/Search';
import Header from './Components/Header';
import AllProducts from './Components/AllProducts';
import ProductInfo from './Components/ProductInfo';
import Trolley from './Components/Trolley';
import Pagos from './Components/Pagos';
import Transaccion from './Components/Transaccion';
import { agregarProducto, vaciarCarrito, removerProducto } from './Components/TrolleyActions';



function App() {

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [itemCantidad, setItemCantidad] = useState(0);
  const [userValidation, setUserValidation] = useState({});   //user valido, compra valida, saldo disponible
  const [userAccount, setUserAccount] = useState({});   //username, password, totalPrice
  const [userPurchase, setUserPurchase] = useState({});   //username, totalPrice, carrito (id, quantity)

  //Actualizamos userPurchase para mandar a backend confirmación de compra con datos de cual usuario, costo de compra 
  //y productos adquiridos (para reducir saldo en billetera y stock de productos).
  useEffect(() => {
    setUserPurchase({
      "username": userAccount.username,
      "totalPrice": userAccount.totalPrice,
      "products": (() => {
        let products = [];
        carrito.map(product => {
          products.push({
            "id": product.item.id,
            "cantidad": product.quantity,
          });
          return true;
        });
        return products;
      })(),
    });
  }, [userAccount, carrito]);

  //Actualizamos cantidad de productos en el carrito
  useEffect(() => {
    const cantidades = () => {
      setItemCantidad(carrito.reduce((obj, cur) => (obj + cur.quantity), 0))
    }
    cantidades()
  },[carrito]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<div> <Search cantidad={itemCantidad}/> <br/> <AllProducts agregarProducto={agregarProducto} setCarrito={setCarrito} carrito={carrito} /> </div>}/>
          <Route path='producto/:id' element={<div> <Search cantidad={itemCantidad} /> <ProductInfo agregarProducto={agregarProducto} setCarrito={setCarrito} carrito={carrito} /></div>} />
          <Route path='/carrito' element={<Trolley agregarProducto={agregarProducto} carrito={carrito} setCarrito={setCarrito} vaciarCarrito={vaciarCarrito} removerProducto={removerProducto} subTotal={subTotal} setSubTotal={setSubTotal}/>} />
          <Route path='/pago/transaccion' element={<Transaccion subTotal={subTotal} setTotal={setTotal} total={total} setUserAccount={setUserAccount} userValidation={userValidation} setUserValidation={setUserValidation} userAccount={userAccount} />} />
          <Route path='/pago/transaccion/confirmacion' element={<Pagos carrito={carrito} subTotal={subTotal} setTotal={setTotal} total={total} userValidation={userValidation} userPurchase={userPurchase}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;