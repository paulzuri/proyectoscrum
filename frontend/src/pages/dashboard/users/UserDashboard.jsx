import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error al obtener los datos</div>;

    return (
        <div className=" bg-gray-100 py-16">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard de Usuario</h1>
                <p className="text-gray-700 mb-6">Bienvenido, {currentUser?.name || 'User'}! Aqui estan tus ultimas ordenes:</p>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Tus Ordenes</h2>
                    {orders.length > 0 ? (
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1">
                                    <p className="font-medium">Id de la Orden: {order._id}</p>
                                    <p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                    <p >Total: ${order.totalPrice}</p>
                                    {order.productIds.map((productId) => (
                                        <p key={productId} className='ml-1'>{productId}</p>
                                    ))}
                                </li>


                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No tienes ordenes recientes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;