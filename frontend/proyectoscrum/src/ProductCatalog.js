
import React from 'react';
import './ProductCatalog.css';
import coca_cola from  './images/coca_cola.jpg';
import doritos from  './images/doritos.png';
import lava_limon from  './images/lava_limon.jpg';




 // Puedes crear este archivo para estilos

 const ProductCatalog = () => {
    return (
      <div className="product-catalog">
        <h1>Catálogo de Productos</h1>
        <div className="product-container">
          <div className="product-card">
            <img src={coca_cola} alt="Coca Cola" />
            <h2>Coca Cola</h2>
            <p>$1.00</p>
          </div>
          <div className="product-card">
            <img src={doritos} alt="Doritos" />
            <h2>Doritos</h2>
            <p>$0.65</p>
          </div>
          <div className="product-card">
            <img src={lava_limon} alt="LAVA Limón" />
            <h2>LAVA - Limón</h2>
            <p>$2.00</p>
          </div>
        </div>
      </div>
    );
  };
  
export default ProductCatalog;
