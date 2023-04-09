import React, { useEffect } from 'react';
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

//Import context
import { useStateContext } from './Context/StateContext';


function App() {
  
  const { carrito, setItemCantidad, userAccount, setUserPurchase } = useStateContext()


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
          <Route path='/' element={ <div> <Search /> <br/> <AllProducts /> </div> }/>
          <Route path='producto/:id' element={ <div> <Search /> <ProductInfo /></div> } />
          <Route path='/carrito' element={ <Trolley /> } />
          <Route path='/pago/transaccion' element={ <Transaccion  /> } />
          <Route path='/pago/transaccion/confirmacion' element={ <Pagos /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;