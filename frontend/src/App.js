import React from 'react';
import logo from './Assets/Images/logo.svg';
import './Assets/CSS/App.css';

//Import components
import Search from './Components/Search';
import Header from './Components/Header';



function App() {

  return (
    <React.Fragment>
        <div>
          <Header />
        </div>

        <div>
          <Search />
        </div>
    </React.Fragment>
  );

}

export default App;
