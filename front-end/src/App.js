import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import ProductPage from './pages/ProductPage'; // Asegúrate de tener este componente

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;