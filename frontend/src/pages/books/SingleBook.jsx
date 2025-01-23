import React, { useEffect, useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchProductByIdQuery } from '../../redux/features/products/productsApi';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchProductByIdQuery(id);

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity }));
    }

    const handleInputChange = (e) => {
        let value = Number(e.target.value);
        if (e.target.value === '') {
            value = 1;
        } else if (value < 1) {
            value = 1;
        } else if (value > book.stock) {
            value = book.stock;
        }
        setQuantity(value);
    };

    if (isLoading) return <div>Cargando...</div>
    if (isError) return <div>Error al cargar detalles del producto</div>
    return (
        <div className="w-full shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className="flex">
                <div className="w-1/2">
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8 w-3/4 mx-auto"
                    />
                </div>
                <div className="w-1/2 pl-5 flex flex-col items-center">
                    <div className='mb-5'>
                        <div className="flex justify-center items-center mb-4">
                            <p className="text-gray-700 text-2xl font-semibold">
                                ${book?.newPrice} <span className="line-through font-normal ml-2">$ {book?.oldPrice}</span>
                            </p>
                        </div>
                        <p className="text-gray-700 mb-4 capitalize text-center">
                            <strong>Categoría:</strong> {book?.category}
                        </p>
                        <p className="text-gray-700 mb-4 text-center">
                            <strong>Descripción:</strong> {book.description}
                        </p>
                        <p className="text-gray-800 mb-4 text-center">
                            <strong>Stock:</strong> {book?.stock}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
                            Cantidad:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                            max={book?.stock}
                        />
                    </div>

                    <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1">
                        <FiShoppingCart className="" />
                        <span>Comprar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleBook