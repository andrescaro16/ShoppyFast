import React, { createContext, useContext, useState } from "react";

const Context = createContext();


export const StateContext = ({ children }) => {

    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [carrito, setCarrito] = useState([]);
    const [itemCantidad, setItemCantidad] = useState(0);
    const [userValidation, setUserValidation] = useState({});   //user valido, compra valida, saldo disponible
    const [userAccount, setUserAccount] = useState({});   //username, password, totalPrice
    const [userPurchase, setUserPurchase] = useState({});   //username, totalPrice, carrito (id, quantity)


    const agregarProducto = (item, quantity, carrito) => {
        const existingItem = carrito.find(el => el.item.id === item.id);
        if (existingItem) {
          const nuevoCarrito = carrito.map((el) => {
            if (el.item.id === item.id && el.quantity + quantity > 0 && el.quantity + quantity <=item.cantidad) {
              return {
                item: {
                  ...el.item
                },
                quantity: el.quantity + quantity,
              };
            }
      
            return el;
          });
          return nuevoCarrito;
        }
        else {
          return [...carrito, { item, quantity }];
        }
    };
    

    const vaciarCarrito = (carrito) => {
      const size = carrito.length;
      if (window.confirm("¿Seguro quieres vaciar el carrito?")) {
        return carrito=[];
      }
      else{
        return carrito
      }
    };
    

    const removerProducto = (id, carrito) => {
      const index  = carrito.findIndex(product => product.item.id === id);
      if (index !== -1){
        const nameProduct = carrito.find(product => product.item.id === id).item.name;
        if(window.confirm(`Seguro que deseas eliminar ${nameProduct} del carrito`)){
          return carrito.filter(products => products.item.id !== id);
        }else{
          return carrito;
        }
      }
    };


  return (
    <Context.Provider
    value={{
        total,
        setTotal,
        subTotal,
        setSubTotal,
        carrito,
        setCarrito,
        itemCantidad,
        setItemCantidad,
        userValidation,
        setUserValidation,
        userAccount,
        setUserAccount,
        userPurchase,
        setUserPurchase,
        agregarProducto,
        vaciarCarrito,
        removerProducto,
    }}
    >
    {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);