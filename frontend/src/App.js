import React, { useState, useEffect } from 'react';
import './Assets/CSS/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <Route path='/pago' element={<Pagos carrito={carrito} subTotal={subTotal} total={total} setTotal={setTotal} />} />
          <Route path='/pago/transaccion' element={<Transaccion /*carrito={carrito} subTotal={subTotal}*/ />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;