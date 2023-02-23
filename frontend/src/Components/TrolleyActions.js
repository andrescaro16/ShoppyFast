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