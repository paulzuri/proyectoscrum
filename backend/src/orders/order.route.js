const express = require('express');
const { createAOrder, getOrderByEmail, getInvoice } = require('./order.controller');
const router = express.Router();

router.post('/', createAOrder);
router.get('/email/:email', getOrderByEmail);
router.get('/invoice/:orderId', getInvoice);

module.exports = router;