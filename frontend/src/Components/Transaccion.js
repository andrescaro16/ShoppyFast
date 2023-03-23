import React, {useState} from "react";
import "../Assets/CSS/Transaccion.css";



const Transaccion = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginFormSubmit = (event) => {
      event.preventDefault(); // previene que se refresque la página
  
      // añadir validar el usuario y contraseña
  
      setIsLoggedIn(true); // marca al usuario como conectado
    };
  

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
                            <input type="text" class="form-control" id="inputUsername" />
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">
                                Contraseña
                            </label>
                            <input type="password" class="form-control" id="inputPassword" />
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};


export default Transaccion;
