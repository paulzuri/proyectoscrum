import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Link } from 'react-router-dom';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import news1 from '../../assets/news/news-1.png'
import news2 from '../../assets/news/news-2.png'
import news3 from '../../assets/news/news-3.png'
import news4 from '../../assets/news/news-4.png'





const news = [
  {
    "id": 1,
    "title": "Frizi abre nuevas sucursales en Valle de los Chillos",
    "description": "Ahora Frizi está más cerca de ti, con nuevas sucursales para que tus compras sean más rápidas y cómodas. Visítanos en Valle de los Chillos.",
    "image": news1
},
{
    "id": 2,
    "title": "El compromiso de Frizi con la comunidad",
    "description": "En Frizi, estamos comprometidos con el bienestar de nuestra comunidad. Participamos activamente en iniciativas locales, apoyamos a pequeñas empresas y promovemos prácticas sostenibles para un futuro mejor.",
    "image": news2
},
{
    "id": 3,
    "title": "Frizi lanza una nueva línea de productos ecológicos",
    "description": "Frizi se enorgullece en anunciar el lanzamiento de una nueva línea de productos ecológicos. Estos productos están diseñados para ser amigables con el medio ambiente y ayudar a nuestros clientes a reducir su huella de carbono.",
    "image": news1
},
{
    "id": 4,
    "title": "Frizi implementa envíos gratuitos para compras mayores a $50",
    "description": "Para mejorar la experiencia de nuestros clientes, Frizi ha implementado envíos gratuitos para todas las compras mayores a $50. Aprovecha esta oferta y disfruta de tus productos favoritos sin costo adicional de envío.",
    "image": news2
},
{
    "id": 5,
    "title": "Frizi celebra su aniversario con grandes descuentos",
    "description": "Frizi está celebrando su aniversario con grandes descuentos en toda la tienda. No te pierdas esta oportunidad de obtener tus productos favoritos a precios reducidos. La promoción es válida por tiempo limitado.",
    "image": news1
}
]

const News = () => {
  return (
    <div className='py-16'>
        <h2 className='text-3x1 font-semibold mv-6'>Noticias </h2>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}

        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2    ,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
            news.map((item, index) => (<SwiperSlide key={index}>
                <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12 '>
                    {/*content*/}
                    <div className='py-4'>
                    <Link to="/" className='text-lg font-medium hover:text-blue-500 mb-4'>
                        {item.title}
                    </Link>
                        <div className='w-12 h-[4px] bg-primary mb-5'></div>
                        <p className='text-sm text-gray-600'> {item.description} </p>
                    </div>

                    <div className='flex-shrink-0 '>
                        <img src={item.image} alt="" className='w-full object-cover'/>

                    </div>
                </div>
                </SwiperSlide>
            ))
        }
      </Swiper>

    </div>
  )
}

export default News