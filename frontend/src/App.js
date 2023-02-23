import React from 'react';
import './Assets/CSS/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import components
import Search from './Components/Search';
import Header from './Components/Header';
import AllProducts from './Components/AllProducts';
import ProductInfo from './Components/ProductInfo';



function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<div> <Search /> <br/> <AllProducts /> </div>}/>
          <Route path='producto/:id' element={<div> <Search /> </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
