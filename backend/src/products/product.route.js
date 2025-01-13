const express = require('express');
const Product = require('./product.model');
const { postAProduct, getAllProducts, getSingleProduct, UpdateProduct, deleteAProduct } = require('./product.controller');
const router = express.Router();

//post a product

router.post("/create-product", postAProduct);

// get all products
router.get("/", getAllProducts)

// get single product
router.get("/:id", getSingleProduct)

// update a product endpoint
router.put("/edit/:id", UpdateProduct);

router.delete("/:id", deleteAProduct)

module.exports = router;