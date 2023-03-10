import '../Assets/CSS/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Header() {

  return (
    
    <nav class="navbar navbar-expand-lg navbar-light">

      <div class="container-fluid">

        <a className="navbar-brand" href="/">ShoppyFast</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/admin">Administrador</a>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}


export default Header;