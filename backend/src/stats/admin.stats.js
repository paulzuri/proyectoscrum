const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Product = require('../products/product.model'); // Importa el modelo de productos
const router = express.Router();

// Función para calcular estadísticas del administrador
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 3. Trending products statistics
        const trendingProductsCount = await Product.aggregate([
            { $match: { trending: true } },  // Filtra solo los productos destacados
            { $count: "trendingProductsCount" }  // Cuenta los productos destacados
        ]);
        const trendingProducts = trendingProductsCount.length > 0 ? trendingProductsCount[0].trendingProductsCount : 0;

        // 4. Total number of products and total stock
        const totalProducts = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },  // Cuenta el número total de productos
                    totalStock: { $sum: "$stock" }  // Suma el stock de todos los productos
                }
            }
        ]);
        const totalProductsCount = totalProducts.length > 0 ? totalProducts[0].totalProducts : 0;
        const totalStock = totalProducts.length > 0 ? totalProducts[0].totalStock : 0;

        // 5. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },  // Agrupa por año y mes
                    totalSales: { $sum: "$totalPrice" },  // Suma el total de ventas por mes
                    totalOrders: { $sum: 1 }  // Cuenta el total de pedidos por mes
                }
            },
            { $sort: { _id: 1 } }  // Ordena por fecha ascendente
        ]);

        // Resultado final
        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingProducts,
            totalProducts: totalProductsCount,
            totalStock,
            monthlySales,
        });

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
});

module.exports = router;