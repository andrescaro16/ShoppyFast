import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import '../Assets/CSS/QR.css';
import Html5QrcodePlugin from '../Html5QrcodeScannerPlugin';
import ResultContainerPlugin from '../ResultCointainerPlugin';
import Quantity from './Quantity';
import { getProduct } from '../Services/productInfoServices';

import { useStateContext } from '../Context/StateContext';


const Qr = () => {

    const { carrito, setCarrito, agregarProducto, setOpenQuantity, cantidadConfirmDialog } = useStateContext();
    const [decodedResults, setDecodedResults] = useState([]);
    const [decodedText, setDecodedText] = useState("");


    const onNewScanResult = (decodedText, decodedResult) => {
        setOpenQuantity(true);
        console.log("App [result]", decodedText);
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
        <div style={{display: "flex"}}>
            <div>
                <Link to="/" style={{'paddingRight': "150px", float: "left"}}>
                    <Button color="danger">Volver</Button>
                </Link>
            </div>
            <div>
                <Quantity handleAddToCart={handleAddToCart} />
            </div>
            <div className="Qr">
                <section className="Qr-section">
                    <div className="Qr-section-title"> Escanea el QR del producto :) </div>
                    <br />
                    <br />
                    <br />
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                    <ResultContainerPlugin results={decodedResults} />
                </section>
            </div>
        </div>
    );
};

export default Qr;