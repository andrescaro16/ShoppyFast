import React, {useState, useEffect} from "react";
import "../Assets/CSS/Transaccion.css";
import { useNavigate } from 'react-router';
import { calculateTotal } from '../Services/productInfoServices';


const Transaccion = ({ subTotal, setTotal, total, setUserAccount }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const getTotalIva = async () => {
            setTotal(await calculateTotal(subTotal));
        };
        getTotalIva();
    }, [subTotal]);


    const handleLoginFormSubmit = (event) => {
        event.preventDefault(); // previene que se refresque la página

        //Objeto para envíar al backend
        setUserAccount({
            username: username,
            password: password,
            totalPrice: total,
        });

        navigate("/pago/transaccion/confirmacion");
    };

    const isLoginFormValid = username.trim() !== "" && password.trim() !== "";

    return(
        <React.Fragment>
            <div class="form-wrapper">
                <div class="form-container">
                    <h3>Banco</h3>
                    <form onSubmit={handleLoginFormSubmit}>
                        <div class="mb-3">

                            <label for="inputUsername" class="form-label">
                                Nombre de usuario
                            </label>

                            <input type="text" class="form-control" id="inputUsername" value={username} onChange={(event) => setUsername(event.target.value)}/>

                        </div>
                        <div class="mb-3">

                            <label for="inputPassword" class="form-label">
                                Contraseña
                            </label>

                            <input type="password" class="form-control" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)}/>

                        </div>

                        <button type="submit" class="btn btn-primary" disabled={!isLoginFormValid}>
                            Ingresar
                        </button>

                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};


export default Transaccion;
