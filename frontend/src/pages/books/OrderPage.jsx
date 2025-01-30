import React, { useState } from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import { FaDownload, FaSpinner } from 'react-icons/fa';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const [downloadingId, setDownloadingId] = useState(null);
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    const handleDownloadInvoice = async (orderId) => {
        try {
            setDownloadingId(orderId);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/download-invoice/${orderId}`);
            
            if (!response.ok) {
                throw new Error('Failed to download invoice');
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('Error downloading invoice. Please try again.');
        } finally {
            setDownloadingId(null);
        }
    };

    if (isLoading) return <div className="text-center py-4">Loading orders...</div>;
    if (isError) return <div className="text-red-500 text-center py-4">Error loading orders</div>;

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Tus Órdenes</h2>
            {orders.length === 0 ? (
                <div className="text-center text-gray-500">No hay ordenes encontradas!</div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order, index) => (
                        <div key={order._id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded"># {index + 1}</span>
                                <button
                                    onClick={() => handleDownloadInvoice(order._id)}
                                    disabled={downloadingId === order._id}
                                    className={`flex items-center gap-2 px-4 py-2 rounded ${
                                        downloadingId === order._id 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                >
                                    {downloadingId === order._id ? (
                                        <><FaSpinner className="animate-spin" /> Procesando...</>
                                    ) : (
                                        <><FaDownload /> Descargar Factura</>
                                    )}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Detalles de la Orden:</p>
                                    <p>ID: {order._id}</p>
                                    <p>Nombre: {order.name}</p>
                                    <p>Email: {order.email}</p>
                                    <p>Teléfono: {order.phone}</p>
                                    <p className="font-bold">Total: ${order.totalPrice}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Dirección:</p>
                                    <p>{order.address}</p>
                                    <p className="mt-2 font-semibold">Referencia:</p>
                                    <p>{order.referencia}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="font-semibold">Productos:</p>
                                <ul className="list-disc pl-6">
                                    {order.products.map(({ productId, quantity }) => (
                                        <li key={productId._id} className="py-1">
                                            {productId.title} - {quantity} unidad(es)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;