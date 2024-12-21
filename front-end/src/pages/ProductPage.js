import React from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
      {/* Aquí puedes agregar más lógica para mostrar los detalles del producto */}
    </div>
  );
}

export default ProductPage;