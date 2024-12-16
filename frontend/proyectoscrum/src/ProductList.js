import React from 'react';
import './ProductCatalog.css';  // Reutilizamos los estilos para los productos
import { Link } from 'react-router-dom';  // Para navegación

const ProductList = ({ products }) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div
          key={product.id}
          className={`product-card ${product.stock === 0 ? 'out-of-stock' : ''}`}
        >
          <img src={product.image_url} alt={product.name} />
          
          <h2>{product.name}</h2>
          <p>${product.price.toFixed(2)}</p>
          <Link to={`/product/${product.id}`} className="product-link">Ver Detalles</Link>  {/* Enlace a la página de detalles */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
