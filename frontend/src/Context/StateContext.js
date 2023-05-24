import React, { createContext, useContext, useState } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();


export const StateContext = ({ children }) => {

    //----------------------------------------------------[User]---------------------------------------------------
	const [total, setTotal] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [carrito, setCarrito] = useState([]);
	const [itemCantidad, setItemCantidad] = useState(0);
	const [userValidation, setUserValidation] = useState({});   // validUser, validPurchase, availableBalance
	const [userAccount, setUserAccount] = useState({});         // username, password, totalPrice
	const [userPurchase, setUserPurchase] = useState({});       // username, totalPrice, carrito (id, quantity)
	const [userData, setUserData] = useState({                  // temporal state for invoice simulation
		name: "",
		document_id: "",
		email: "",
	});
	const [dataInvoice, setDataInvoice] = useState({});
	const [openQuantity, setOpenQuantity] = useState(false);
	const [cantidadConfirmDialog, setCantidadConfirmDialog] = useState();
	const [searchTerm, setSearchTerm] = useState("");
	//---------------------------------------------------[Admin]---------------------------------------------------
	const [tokenId, setTokenId] = useState("");
	const [codigoCupon, setCodigoCupon] = useState("");
	const [porcentajeDescuento, setPorcentajeDescuento] = useState();
	const [ProductInfo, setProductInfo] = useState({                 
		id: 0,
		name: "",
		marca: "",
		description: "",
		price: 0,
		imgURL: "",
		cantidad: 0,
		deleted: false,
		category: "",
	});

	const agregarProducto = (item, quantity, carrito) => {
		const existingItem = carrito.find(productCart => productCart.item.id === item.id);
		if (existingItem) {
			const nuevoCarrito = carrito.map((productCart) => {
				if (productCart.item.id === item.id) {
					if(productCart.quantity + quantity > 0 && productCart.quantity + quantity <= item.cantidad){
						toast.success(`${quantity} ${productCart.item.name} añadido al carrito`, {
							id: 'productAdded',
						});
						return {
							item: { ...productCart.item },
							quantity: productCart.quantity + quantity,
						};
					} else{
						if(item.cantidad > 0){
							toast.error(`Solo hay ${item.cantidad} en stock`);
						}else{
							toast.error(`No hay ${quantity} en stock`);
						}
					}
				}
            	return productCart;
			});
			return nuevoCarrito;
        }
    	else {
			if(quantity <= item.cantidad){
				toast.success(`${quantity} ${item.name} añadido al carrito`, {
					id: 'productAdded',
				});
				return [...carrito, { item, quantity }];
			} else if(item.cantidad > 0){
				toast.error(`Solo hay ${item.cantidad} en stock`);
			} else{
				toast.error(`Existencias agotadas`);
			}
			return carrito;
    	}
	};
    

	const vaciarCarrito = (carrito) => {
		if (window.confirm("¿Seguro quieres vaciar el carrito?")) {
			return carrito=[];
		}
		return carrito;
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


	const generateInvoice = () => {

		let products = [];
    	carrito.map(product => {
        	products.push({
				"id": product.item.id,
				"cantidad": product.quantity,
				"name": product.item.name,
				"price": product.item.price,
        	})
    	});

		const invoice = {
			"user_email": userData.email,
			"user_name": userData.name,
			"document_id": userData.document_id,
			"subTotal": subTotal,
			"total": total,
			"products": products,
		};

		setDataInvoice(invoice);

		return invoice;
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
			userData,
			setUserData,
			dataInvoice,
			setDataInvoice,
			openQuantity,
			setOpenQuantity,
			tokenId,
			setTokenId,
			cantidadConfirmDialog,
			setCantidadConfirmDialog,
			searchTerm,
			setSearchTerm,
			agregarProducto,
			vaciarCarrito,
			removerProducto,
			generateInvoice,
			codigoCupon,
			setCodigoCupon,
			porcentajeDescuento,
			setPorcentajeDescuento,
			ProductInfo,
			setProductInfo
    	}}
    	>
    	{children}
    	</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context);