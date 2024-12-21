import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiService";

function Homepages() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  function handleProductClick(id) {
    navigate(`/productos/${id}`);
  }

  return (
    <div>
      <div>
        {products.map((product) => (
          <div 
            key={product.id_producto} 
            onClick={() => handleProductClick(product.id_producto)}
          >
            <div>
              <img src={product.imagen} alt="imagen" />
            </div>
            <div>
              <h1>Q{product.precio}</h1>
            </div>
            <div>
              <p>{product.nombre} de la marca {product.marca}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepages;