import React, {useState, useEffect} from "react";
import "../Assets/CSS/Transaccion.css";
import { useNavigate } from 'react-router';
import { bankLogin } from '../Services/productInfoServices';
import { NavLink } from 'react-router-dom';

import { useStateContext } from "../Context/StateContext";


const Transaccion = () => {

    const { total, setUserAccount, setUserValidation } = useStateContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const isLoginFormValid = username.trim() !== "" && password.trim() !== "";

    let navigate = useNavigate();


    const handleLoginFormSubmit = async (event) => {
        event.preventDefault(); // previene que se refresque la página

        //Objeto para enviar al backend
        let requestUserAccount = {
            username: username,
            password: password,
            totalPrice: total,
        }
        setUserAccount(requestUserAccount);
        
        let bankLoginResponse = await bankLogin(requestUserAccount) 
        setUserValidation(bankLoginResponse);

        if(bankLoginResponse.validUser){
            navigate("/formulario");     //'/factura/formulario'
        }else{
            const messageInvalid = document.getElementById('message-invalid');
            messageInvalid.style.display = 'block';
        } 
    };


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

                        <p id="message-invalid" style={{textAlign:"center", color:"red", marginTop: "40px", display: "none"}}>Nombre de usuario y/o<br/>contraseña incorrectos</p>
                        
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
