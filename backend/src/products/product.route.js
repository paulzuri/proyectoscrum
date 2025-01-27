const express = require('express');
const Product = require('./product.model');
const { postAProduct, getAllProducts, getSingleProduct, UpdateProduct, deleteAProduct, reduceStock } = require('./product.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// Post a product
router.post("/create-product", verifyAdminToken, postAProduct);

// Get all products
router.get("/", getAllProducts);

// Search products
router.get("/search", async (req, res) => {
    const { query } = req.query; // Captura el término de búsqueda
    console.log("Término de búsqueda recibido:", query); // Log para verificar qué llega al servidor

    if (!query) {
        return res.status(400).json({ message: "El parámetro 'query' es requerido" });
    }

    try {
        const regex = new RegExp(query, "i"); // Crear regex insensible a mayúsculas/minúsculas
        console.log("Regex generado:", regex); // Log del regex generado

        const products = await Product.find({ title: { $regex: regex } }); // Búsqueda en el campo "title"
        console.log("Productos encontrados:", products); // Log de los resultados

        res.status(200).json(products || []); // Devuelve un array vacío si no encuentra nada
    } catch (error) {
        console.error("Error al buscar productos:", error); // Log del error
        res.status(500).json({ message: "Error al buscar productos" });
    }
});

// Get single product
router.get("/:id", getSingleProduct);

// Update a product
router.put("/edit/:id", verifyAdminToken, UpdateProduct);

// Delete a product
router.delete("/:id", verifyAdminToken, deleteAProduct);

// Reduce stock
router.post("/reduce-stock", reduceStock);

module.exports = router;