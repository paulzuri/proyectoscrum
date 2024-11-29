import React, { useState, useEffect } from 'react';
import './ProductCatalog.css';
import ProductList from './ProductList';

// Importar imágenes
import goudaCheeseImage from './images/gouda-cheese.png';
import tomateImage from './images/tomate.jpg';
import supanBlancoImage from './images/supan-blanco.jpg';
import bandejasPechugasImage from './images/Bandejas-Pechugas.png';
import donVittorioImage from './images/don-Vittorio.png';
import aceiteOlivaImage from './images/Aceite_Oliva.jpg';
import yogurtToniNaturalImage from './images/yogurt-toni-natural.png';
import papelHigienicoImage from './images/papel_higienico.png';
import cerealImage from './images/cereal.png';
import jugoNaranjaImage from './images/jugo_naranja.png';

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
        console.log('Datos recibidos del backend:', data); // Inspecciona la estructura
        setProducts(data); // Actualiza el estado
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(`Failed to fetch products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Atributos de los productos (sin incluir la parte de renderizado HTML)
  const allProducts = [
    { name: 'Queso Gouda', price: 5.0, image: goudaCheeseImage },
    { name: 'Tomates', price: 1.8, image: tomateImage },
    { name: 'Sopan Blanco', price: 3.0, image: supanBlancoImage },
    { name: 'Pechugas de Pollo', price: 7.5, image: bandejasPechugasImage },
    { name: 'Don Vittorio', price: 4.0, image: donVittorioImage },
    { name: 'Aceite de Oliva', price: 4.5, image: aceiteOlivaImage },
    { name: 'Yogurt Toni Natural', price: 3.0, image: yogurtToniNaturalImage },
    { name: 'Papel Higiénico', price: 2.2, image: papelHigienicoImage },
    { name: 'Cereal', price: 3.5, image: cerealImage },
    { name: 'Jugo de Naranja', price: 2.8, image: jugoNaranjaImage },
  ];

  return (
    <div className="product-catalog">
      <h1>Catálogo de Productos</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ProductList products={allProducts} />
      )}
    </div>
  );
};

export default ProductCatalog;
