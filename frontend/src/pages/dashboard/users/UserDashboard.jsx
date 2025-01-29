import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error al obtener los datos</div>;

    return (
        <div className=" bg-gray-100 py-16">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard de Usuario</h1>
                <p className="text-gray-700 mb-6">Bienvenido!</p>

                    <p className="inline-block align-baseline font-medium mt-4 text-sm">
                        Quieres cambiar de contraseña?
                        <Link to="/change-password" className='text-blue-500 hover:text-blue-800'> Cambiala Aqui</Link>
                    </p>
                <div>

                </div>
            </div>
        </div>
    );
};

export default UserDashboard;