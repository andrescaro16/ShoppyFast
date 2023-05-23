import React, { useState } from "react";
import "../Assets/CSS/AdminLogin.css";
import logo from "../Assets/Images/ShoppyfastLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../Context/StateContext";
import { sendAdminInfo } from "../Services/productInfoServices";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setTokenId,tokenId } = useStateContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password
    };

    let adminValidation = await sendAdminInfo(formData);
    const token = adminValidation.token;
    localStorage.setItem("adminToken", token);
    setTokenId(token);

    if (adminValidation.concluded === true) {
      navigate('/administrador/home');
    } else {
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerText = 'La cuenta del administrador no existe'; 
      errorMessage.style.display = 'block'; 
    }
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
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="primary-button">
             Iniciar sesión
            </button>
          </div>
        </form>
        <div id="error-message" style={{ display: 'none', color: 'red', marginTop: '10px' }}>
          La cuenta del administrador no ha sido concluida
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;