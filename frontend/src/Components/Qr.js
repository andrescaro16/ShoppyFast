import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import '../Assets/CSS/QR.css';
import Html5QrcodePlugin from '../Html5QrcodeScannerPlugin';
import ResultContainerPlugin from '../ResultCointainerPlugin';

import { useStateContext } from '../Context/StateContext';


const Qr = () => {

    const { carrito, setCarrito, agregarProducto } = useStateContext();

    const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult = (decodedText, decodedResult) => {
        setCarrito(agregarProducto({
            cantidad: 5,
            description: "Ranchera de la rica",
            id: 16,
            imgURL: "https://d2n7tchuu1wmsv.cloudfront.net/uploads/17047/products/1594737492_1592344198638_original_salchicha_ranchera_premiium_7_197sszkr7.jpg",
            marca: "Ranchera",
            name: "Salchicha Premium",
            price: 3100,
        }, 1, carrito))
        console.log("App [result]", decodedResult);
        setDecodedResults(prev => [...prev, decodedResult]);
    };

    return (
        <div>
            <div>
                <Link to="/" style={{'paddingRight': "150px", float: "left"}}>
                    <Button color="danger">Volver</Button>
                </Link>
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