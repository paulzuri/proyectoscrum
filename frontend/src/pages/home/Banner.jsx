import React from 'react'
import { Link } from "react-router-dom";

import bannerImg from "../../assets/FriziBanner.png"

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img src={bannerImg} alt="" />
            </div>

            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'> Obten tus víveres frescos con Frizi</h1>
                <p className='mb-10'>Abastece tu hogar con lo mejor y más fresco de nuestra colección de víveres. Desde productos recién cosechados hasta básicos para tu despensa, el catalogo de frizy tienen todo lo que necesitas para mantener tu despensa llena y tus comidas deliciosas.</p>

                <Link to="/login" className="btn-primary">
                Inicia sesión
                </Link>
            </div>


        </div>
    )
}

export default Banner