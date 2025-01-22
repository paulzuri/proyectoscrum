import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeFromCart, clearCart } from '../../redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Cart Items:', cartItems);
    }, [cartItems]);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <>
            <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                        <div className="text-lg font-medium text-gray-900">Carrito de compras</div>
                        <div className="ml-3 flex h-7 items-center">
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all"
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-500">Tu carrito está vacío</div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((product) => (
                                    <li key={product._id} className="py-6 flex">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.coverImage}
                                                alt={product.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link to={`/products/${product._id}`}>{product.title}</Link>
                                                    </h3>
                                                    <p className="sm:ml-4">${(product.newPrice * product.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Categoria: </strong>{product.category}</p>
                                            </div>
                                            <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                <p className="text-gray-500"><strong>Cantidad:</strong> {product.quantity}</p>

                                                <div className="flex">
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product)}
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${totalPrice}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;