import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MovieModel from './model/MovieModel';

let model = new MovieModel();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App model={model}/>
    </BrowserRouter>
  </React.StrictMode>
);