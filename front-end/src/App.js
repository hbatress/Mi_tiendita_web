import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepages from './components/homepages';
import ProductPage from './pages/ProductPage'; // Asegúrate de tener este componente

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepages />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;