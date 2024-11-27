import React, { useState, useEffect } from 'react';
import './ProductCatalog.css';
import ProductList from './ProductList';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5555/products');
        if (!response.ok) {
          throw new Error('HTTP error! Status: ${response.status}');
        }
        const data = await response.json();
        console.log('Datos recibidos del backend:', data); // Inspecciona la estructura
        setProducts(data); // Actualiza el estado
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products: ${err.message}');
      }finally {
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
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductCatalog;
