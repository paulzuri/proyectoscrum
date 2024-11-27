import React from 'react';
import './ProductCatalog.css';
import ProductList from './ProductList';

import coca_cola from  './images/coca_cola.jpg';
import doritos from  './images/doritos.png';
import lava_limon from  './images/lava_limon.jpg';
import leche from  './images/leche.png';


const ProductCatalog = () => {
  // Lista de productos simulados
  const products = [
    {
      name: 'Coca Cola',
      price: 1.0,
      image: coca_cola,
    },
    {
      name: 'Doritos',
      price: 0.65,
      image: doritos,
    },
    {
      name: 'LAVA - Limón',
      price: 2.0,
      image: lava_limon,
    },
    {
      name: 'Leche',
      price: 3.0,
      image: leche,
    },
  ];

  return (
    <div className="product-catalog">
      <h1>Catálogo de Productos</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductCatalog;
