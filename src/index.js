import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Formulario from './components/Formulario'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Formulario />
  </React.StrictMode>
);

