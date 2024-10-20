import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PokemonDetail from './component/pokemon_details';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
