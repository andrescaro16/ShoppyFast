import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import '../Assets/CSS/QR.css';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin';
import Quantity from './Quantity';
import { getProduct } from '../Services/productInfoServices';
import Trolley from './Trolley';
import CartHeader from './CartHeader';

import { useStateContext } from '../Context/StateContext';


const Qr = () => {

    const { carrito, setCarrito, agregarProducto, setOpenQuantity, cantidadConfirmDialog } = useStateContext();
    const [decodedResults, setDecodedResults] = useState([]);
    const [decodedText, setDecodedText] = useState("");


    const onNewScanResult = (decodedText, decodedResult) => {
        setOpenQuantity(true);
        console.log("App [result]", decodedResult);
        setDecodedResults(prev => [...prev, decodedResult]);
        setDecodedText(decodedText);
    };


    const handleAddToCart = async () => {
        const data = await getProduct(decodedText);
        if (data !== 404) {
            setCarrito(agregarProducto(data[0], cantidadConfirmDialog, carrito));
        }
        setOpenQuantity(false);
        console.log("Cantidad: ", cantidadConfirmDialog)
        console.log("Carrito: ", carrito)
    };


    return (
        <div >

            <div className="Qr-section-title"> Escanea el QR del producto :) </div>

            <CartHeader />

            <div>
                <Quantity handleAddToCart={handleAddToCart} />
            </div>
            <br />
            <br />
            <div className="Qr">
                <section className="Qr-section">
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                    <Trolley />
                </section>
            </div>

        </div>
    );
};

export default Qr;