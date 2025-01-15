const express = require('express');
const Product = require('./product.model');
const { postAProduct, getAllProducts, getSingleProduct, UpdateProduct, deleteAProduct } = require('./product.controller');
const { verify } = require('jsonwebtoken');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

//post a product

router.post("/create-product", verifyAdminToken, postAProduct);

// get all products
router.get("/", getAllProducts)

// get single product
router.get("/:id", getSingleProduct)

// update a product endpoint
router.put("/edit/:id", verifyAdminToken, UpdateProduct);

router.delete("/:id", verifyAdminToken, deleteAProduct)

module.exports = router;