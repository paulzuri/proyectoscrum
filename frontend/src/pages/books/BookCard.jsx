import React, { useEffect, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({ book }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async (product) => {
        try {
            dispatch(addToCart({ product, quantity }));
        } catch (error) {
            console.error('dispatch error:', error);
        }
    };

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

    useEffect(() => {
        console.log(quantity);
    }, [quantity]);

    if (book?.stock === 0) {
        return null;
    }

    return (
        <div className="rounded-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt=""
                            className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div>
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {book?.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">
                        {book?.description.length > 80
                            ? `${book.description.slice(0, 80)}...`
                            : book?.description}
                    </p>
                    <p className="font-medium mb-5">
                        ${book?.newPrice}{' '}
                        <span className="line-through font-normal ml-2">
                            $ {book?.oldPrice}
                        </span>
                    </p>
                    <p className="text-gray-800 mb-4">Stock: {book?.stock}</p>

                    <form className="max-w-sm mx-auto">
                        <label
                            htmlFor="number-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Selecciona una cantidad:
                        </label>
                        <input
                            type="number"
                            id="number-input"
                            aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            min="1"
                            max={book.stock}
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </form>

                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn-primary px-6 space-x-1 flex items-center gap-1 "
                    >
                        <FiShoppingCart className="" />
                        <span>Comprar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;