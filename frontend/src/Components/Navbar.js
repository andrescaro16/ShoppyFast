//import '../Assets/CSS/Header.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../Assets/Images/ShoppyfastLogo2.png";


function Navbar() {

  return (

    <nav className="navbar navbar-expand-lg mb-3 navbar-layout navbar-ligth bg-light">
      <div class="container">
      <a class="navbar-brand" href="/">
        <div class="d-flex align-items-center">
        <img src={logo} alt="logo de shoppyfast" width="100" height="60" />
        <strong><h3>ShoppyFast</h3></strong>
        </div>
       
       </a>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto">
                <a class="nav-link" href="/" style={{color: 'black'}}>Home</a>
                <a class="nav-link" href="/administrador" style={{color: 'black'}}> Administrador </a>
            </div>
        </div>

      </div>
    </nav>

  );
}

export default Navbar;