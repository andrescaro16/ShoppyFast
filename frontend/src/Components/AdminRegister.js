import React, { useState } from "react";
import "../Assets/CSS/AdminRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email} | Username: ${username} | Password: ${password}`);
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2>Registro</h2>
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
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            Registrarse
          </button>
        </form>
        <div className="login-link">
          ¿Ya tienes una cuenta? <NavLink to="/administrador" exact><a href="#">Iniciar sesión</a></NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
