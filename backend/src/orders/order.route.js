const express = require('express');
const { createAOrder, getOrderByEmail, getInvoice, downloadInvoice } = require('./order.controller');
const router = express.Router();

router.post('/', createAOrder);
router.get('/email/:email', getOrderByEmail);
router.get('/invoice/:orderId', getInvoice);
router.get('/download-invoice/:orderId', downloadInvoice);

module.exports = router;