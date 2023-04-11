import React, { useState } from "react";
import "../Assets/CSS/AdminLogin.css";
import logo from "../Assets/Images/ShoppyfastLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email} | Password: ${password}`);
  };

  return (
    <div className="admin-container">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo de Shoppyfast" width="500" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} /> Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Iniciar sesión
          </button>
        </form>
         <div className="register-link">
        ¿No tienes una cuenta? <a href="#">Regístrate ahora</a>
      </div>
      </div>
      
    </div>
    
  );
};

export default Admin;