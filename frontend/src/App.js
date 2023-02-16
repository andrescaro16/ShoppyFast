import logo from './Assets/Images/logo.svg';
import './Assets/CSS/App.css';

//Import components
import Search from './Components/Search';


function saludo(name, age) {
  
  let presentation = (
    <div>
      <h1> Hola, soy {name}</h1>
      <h2>Tengo {age} años</h2>
    </div>
  );

  return presentation;
}


function App() {

  return (
    <div>
      <Search />
    </div>
  );

}

export default App;
