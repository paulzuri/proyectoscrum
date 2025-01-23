import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeFromCart, clearCart, updateCartQuantity } from '../../redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';

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

    const handleInputChange = (e, product) => {
        let value = Number(e.target.value);
        if (e.target.value === '') {
            value = 1;
        } else if (value < 1) {
            value = 1;
        } else if (value > product.stock) {
            value = product.stock;
        }
        dispatch(updateCartQuantity({ productId: product._id, quantity: value }));
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
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                alt=""
                                                src={`${getImgUrl(product.coverImage)}`}
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
                                                <form className="max-w-sm">
                                                    <label
                                                        htmlFor={`quantity-input-${product._id}`}
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Cantidad:
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id={`quantity-input-${product._id}`}
                                                        aria-describedby="helper-text-explanation"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                        min="1"
                                                        max={product.stock}
                                                        value={product.quantity}
                                                        onChange={(e) => handleInputChange(e, product)}
                                                    />
                                                </form>

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
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Pagar
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to="/">
                            o
                            <button
                                type="button"

                                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                            >
                                Continuar Comprando 
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;