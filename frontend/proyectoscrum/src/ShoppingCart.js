import React from 'react';
import './ShoppingCart.css'; // Asegúrate de crear este archivo CSS
import cocaColaImage from './images/coca_cola.jpg';

import { Link } from 'react-router-dom';

import cerealImage from './images/cereal.png';
import jugoNaranjaImage from './images/jugo_naranja.png';

const ShoppingCart = () => {
    // Lista ficticia de productos en el carrito
    const cartItems = [
        { id: 1, name: 'Cereal', price: 5.0, quantity: 2, image: cerealImage },
        { id: 2, name: 'Coca-Cola 2L', price: 1.5, quantity: 3, image: cocaColaImage },
        { id: 3, name: 'Jugo Naranja', price: 4.5, quantity: 1, image: jugoNaranjaImage },
    ];

    // Calcular el subtotal
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="shopping-cart">

            <h2>Mi Carrito de Compras</h2>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td className="product-description">
                                <img src={item.image} alt={item.name} className="product-image" />
                                <span>{item.name}</span>
                            </td>
                            <td className="product-quantity">
                                <button className="quantity-button">-</button>
                                <span>{item.quantity}</span>
                                <button className="quantity-button">+</button>
                            </td>
                            <td className="product-price">${(item.price * item.quantity).toFixed(2)}</td>

                            <td className="product-remove">
                                <button className="remove-button">✖</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="cart-summary">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Total: ${subtotal.toFixed(2)}</p>
            </div>
            <div className="cart-buttons">
                <Link to="/" className="">
                    <button className="continue-shopping">Continuar Comprando</button>
                </Link>
                <button className="proceed-payment">Proceder con el Pago</button>
            </div>
        </div>
    );
};

export default ShoppingCart;
