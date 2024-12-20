import React, { useState, useEffect } from "react";
import { getProducts } from "../services/apiService";

function Homepages() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div>
        
        {products.map((product) => (
          <div key={product.id_producto}>
            <img  src={product.imagen} alt={product.nombre} />
            <div >
            <p > {product.nombre}</p>
            <p >Q{product.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepages;