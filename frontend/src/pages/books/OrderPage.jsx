import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth()

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error getting orders data</div>
    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Tus Órdenes</h2>
            {
                orders.length === 0 ? (<div>No hay ordenes encontradas!</div>) : (<div>
                    {
                        orders.map((order, index) => (
                            <div key={order._id} className="border-b mb-4 pb-4">
                                <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                                <h2 className="font-bold">Order ID: {order._id}</h2>
                                <p className="text-gray-600">Nombre: {order.name}</p>
                                <p className="text-gray-600">Email: {order.email}</p>
                                <p className="text-gray-600">Teléfono: {order.phone}</p>
                                <p className="text-gray-600">Precio Total: ${order.totalPrice}</p>
                                <h3 className="font-semibold mt-2">Dirección:</h3>
                                <p>{order.address}</p> {/* Mostramos solo la dirección completa */}
                                <h3 className="font-semibold mt-2">Referencia:</h3>
                                <p>{order.referencia}</p> {/* Mostramos la referencia */}
                                <h3 className="font-semibold mt-2">Productos:</h3>
                                <ul>
                                    {order.products.map(({ productId, quantity }) => (
                                        <li key={productId._id}>
                                            {productId.title} - {quantity} unidad(es)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>)

            }
        </div>
    )
}

export default OrderPage
