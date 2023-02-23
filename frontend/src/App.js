import React, { useState, useEffect } from 'react';
import './Assets/CSS/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import components
import Search from './Components/Search';
import Header from './Components/Header';
import AllProducts from './Components/AllProducts';
import ProductInfo from './Components/ProductInfo';
import Trolley from './Components/Trolley';
import { agregarProducto } from './Components/TrolleyActions';



function App() {

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
          <Route path='/carrito' element={<Trolley agregarProducto={agregarProducto} carrito={carrito} setCarrito={setCarrito} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
