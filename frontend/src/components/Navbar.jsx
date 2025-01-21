import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // Para solicitudes HTTP
import { useSearchProductsQuery } from "../redux/features/products/productsApi"; // Importa el hook



const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Ordenes", href: "/orders" },
    { name: "Carrito", href: "/cart" },
]

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState(""); // Manejar el término de búsqueda
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log(cartItems)
    
    const {currentUser, logout} = useAuth();
    const handleLogOut = () => {
        logout()
    };

    // Manejador de búsqueda
    const { data: searchResults = [], isFetching } = useSearchProductsQuery(searchQuery, {
        skip: !searchQuery, // Solo realiza la consulta si hay un término de búsqueda
    });

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>
                </div>

                {/* search input */}
                <div className="relative sm:w-72 w-40 space-x-2">
                    <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                    />
                    {isFetching && <p className="text-sm text-gray-500">Buscando...</p>}

                    {/* Mostrar resultados de búsqueda */}
                    {Array.isArray(searchResults) && searchResults.length > 0 && (
                        <ul className="absolute bg-white shadow-lg mt-2 w-full rounded-md">
                            {searchResults.map((product) => (
                                <li key={product._id} className="p-2 border-b hover:bg-gray-100">
                                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>



                {/* rigth side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div >
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {/* show dropdowns */}
                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                            <ul className="py-2">
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.title} onClick={() => setIsDropdownOpen(false)}>
                                                            <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                                {item.title}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button 
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Cerrar Sesion</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> :                                 <Link to="/login"> <HiOutlineUser className="size-6" /></Link>
                        }
                    </div>

                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        {
                           cartItems.length > 0 ? <span className="text-sm font-semibold 
                           sm:ml-1">{cartItems.length}</span> : <span className="text-sm 
                           font-semibold sm:ml-1">0</span>
                        }
                        
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;