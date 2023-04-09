//import '../Assets/CSS/Header.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {

  return (

    <nav className="navbar navbar-expand-lg mb-3 navbar-layout navbar-dark">
      <div class="container">

        <a class="navbar-brand" href="/"><strong><h3>ShoppyFast</h3></strong></a>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto">
                <a class="nav-link" href="/" style={{color: 'white'}}>Home</a>
                <a class="nav-link" href="/admin" style={{color: 'white'}}> Administrador </a>
            </div>
        </div>

      </div>
    </nav>

  );
}

export default Navbar;