export function agregarProducto(item, quantity, carrito) {
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

export function vaciarCarrito(carrito) {
  const size = carrito.length;
  if (window.confirm("¿Seguro quieres vaciar el carrito?")) {
    return carrito=[];
  }
  else{
    return carrito
  }
};

export function removerProducto(id, carrito){
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