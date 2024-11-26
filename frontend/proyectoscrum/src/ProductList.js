import React from 'react';
import './ProductCatalog.css'; // Reutilizamos los estilos que ya creaste para el catálogo.

const ProductList = ({ products }) => {
  return (
    <div className="product-container">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;