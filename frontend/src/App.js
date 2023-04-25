import React, { useEffect } from 'react';
import './Assets/CSS/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useHistory } from 'react-router-dom';

//Import components
import Search from './Components/Search';
import AllProducts from './Components/AllProducts';
import ProductInfo from './Components/ProductInfo';
import Trolley from './Components/Trolley';
import Pagos from './Components/Pagos';
import Transaccion from './Components/Transaccion';
import UserForm from './Components/UserForm';
import Invoice from './Components/Invoice';
import AdminLogin from './Components/AdminLogin';
import Analytics from './Components/Analytics';
import Qr from './Components/Qr';


//Import context
import { useStateContext } from './Context/StateContext';
import { TbFileAnalytics } from 'react-icons/tb';
import CartHeader from './Components/CartHeader';


function App() {
  
  const { carrito, setItemCantidad, userAccount, setUserPurchase } = useStateContext()


  // We update userPurchase to send to backend confirmation of purchase with data of which user, cost of purchase
  // and products purchased (to reduce wallet balance and product stock).
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

  // Update the quantity of products in the cart
  useEffect(() => {
    const cantidades = () => {
      setItemCantidad(carrito.reduce((obj, cur) => (obj + cur.quantity), 0))
    }
    cantidades()
  },[carrito]);

  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={ <div> <Search /> <br/> <AllProducts /> </div> }/>
          <Route path='producto/:id' element={ <div> <Search /> <ProductInfo /></div> } />
          <Route path='/carrito' element={ <section>  <CartHeader />  <Trolley /> </section> } />
          <Route path='/pago/transaccion' element={ <Transaccion  /> } />
          <Route path='/formulario' element={<UserForm/>} />
          <Route path='/pago/transaccion/confirmacion' element={ <Pagos /> } />
          <Route path='/factura' element={ <Invoice /> } />
          <Route path='/administrador' element={<AdminLogin />} />
          <Route path='/administrador/analitica' element={<Analytics />} /> 
          <Route path='/qr-section' element={< Qr />} />

        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;