import React, { useState, useEffect } from "react";
import { getProducts } from "../services/apiService";

function Homepages() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  function getColorByEstado(estado) {
    const baseClasses = 'font-bold text-lg p-1 rounded-tr-lg rounded-br-lg text-left text-white';
    const estadoClasses = estado === 'agotado' ? 'bg-red-500' : 'bg-green-500';
    return `${baseClasses} ${estadoClasses}`;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 text-center">
        {products.map((product) => (
          <div key={product.id_producto} className="border-2 border-gray-200 p-3 rounded-md shadow-md hover:border-gray-300
          hover:scale-105 transform transition duration-500 ease-in-out cursor-pointer">
            <div className="h-48">
              <img className="rounded-3xl h-full w-full object-cover" src={product.imagen} alt="imagen" />
            </div>
            <div className="grid grid-cols-2 p-1">
              <p className={getColorByEstado(product.estado)}>{product.estado}</p>
              <h1 className="text-blue-800 font-bold text-xl">Q{product.precio}</h1>
            </div>
            <div className="rounded-tl-lg rounded-tr-lg  p-3 w-full futurista-text">
              <p className="text-neon">{product.nombre} de la marca {product.marca}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepages;