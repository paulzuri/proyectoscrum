import React from 'react'
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

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

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
                        className="mb-8 w-full"
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