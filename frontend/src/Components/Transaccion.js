import React, {useState} from "react";
import "../Assets/CSS/Transaccion.css";
import { useNavigate } from 'react-router';


const Transaccion = ({total, setUserAccount }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const handleLoginFormSubmit = (event) => {
        event.preventDefault(); // previene que se refresque la página

        //Objeto para envíar al backend
        setUserAccount({
            username: username,
            password: password,
            totalPrice: total,
        });
    
        setIsLoggedIn(true); // marca al usuario como conectado

        navigate("/pago/transaccion/confirmacion");
    };

    const isLoginFormValid = username.trim() !== "" && password.trim() !== "";

    return(
        <React.Fragment>
            <div class="form-wrapper">
                <div class="form-container">
                    <h4>Banco</h4>
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
