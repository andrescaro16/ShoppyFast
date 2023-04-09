import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/CSS/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout';
import { Toaster } from "react-hot-toast"

import { StateContext } from './Context/StateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateContext>
    <Layout>
      <Toaster />
      <App />
    </Layout>
  </StateContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
