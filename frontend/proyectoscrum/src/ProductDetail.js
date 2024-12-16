import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
  const { id } = useParams();  // Obtener el ID del producto de la URL
  console.log("ID de la URL:", id);  // Verifica el id obtenido de la URL
  const product = products.find((prod) => prod.id === parseInt(id));  // Buscar el producto por ID

  if (!product) {
    return <p>Producto no encontrado</p>;  // Si no se encuentra el producto, mostrar un mensaje
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <p>Precio: ${product.price.toFixed(2)}</p>
      <p>Stock disponible: {product.stock}</p>
      {/* Lógica para aumentar/disminuir cantidad */}
    </div>
  );
};

export default ProductDetail;
