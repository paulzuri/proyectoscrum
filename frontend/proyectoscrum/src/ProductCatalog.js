import React, { useState, useEffect } from 'react';
import './ProductCatalog.css';
import { Link } from 'react-router-dom';  // Importa Link para la navegación
import supan from "./images/supan-blanco.jpg";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5555/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Agregar un producto ficticio con stock 0 para pruebas
        const testProduct = {
          id: 999,
          name: 'Producto Sin Stock',
          price: 10.0,
          stock: 0,
          description: 'Este es un producto de prueba sin stock',
          image_url: supan,
        };

        // Agregar el producto ficticio a la lista
        setProducts([...data, testProduct]);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(`Failed to fetch products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="product-catalog">
      <h1>Catálogo de Productos</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-container">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${product.stock === 0 ? 'out-of-stock' : ''}`}
            >
              <img src={product.image_url} alt={product.name} />
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="product-link">Ver Detalles</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
