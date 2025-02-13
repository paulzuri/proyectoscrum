import React from 'react'
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext"; // Importa el hook de autenticación
import bannerImg from "../../assets/FriziBanner.png"

const Banner = () => {
    const { currentUser } = useAuth();

    return (
        <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img src={bannerImg} alt="" />
            </div>

            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'> Obten tus viveres frescos con Frizi</h1>
                <p className='mb-10'>Abastece tu hogar con lo mejor y más fresco de nuestra colección de víveres. Desde productos recién cosechados hasta básicos para tu despensa, el catalogo de frizy tienen todo lo que necesitas para mantener tu despensa llena y tus comidas deliciosas.</p>

                {!currentUser && (
                    <Link to="/login" className="btn-primary">
                        Inicia Sesión
                    </Link>
                )}
            </div>


        </div>
    )
}

export default Banner