const Order = require('./order.model');
const generateInvoice = require('../utils/pdfGenerator');
const path = require('path');
const fs = require('fs');

const createAOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        let savedOrder = await newOrder.save();
  
        // Populate product details
        savedOrder = await savedOrder.populate('products.productId');
  
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

const downloadInvoice = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('products.productId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Generate PDF invoice
        const invoicePath = path.join(__dirname, `../../../invoices/invoice_${order._id}.pdf`);
        await generateInvoice(order, invoicePath);

        // Send the PDF file to the client
        res.download(invoicePath, `invoice_${order._id}.pdf`, (err) => {
            if (err) {
                console.error('Error downloading invoice:', err);
                res.status(500).json({ message: 'Failed to download invoice' });
            }

            // Delete the file after sending it to the client
            fs.unlinkSync(invoicePath);
        });
    } catch (error) {
        console.error('Error generating invoice', error);
        res.status(500).json({ message: 'Failed to generate invoice' });
    }
};

const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ email })
            .sort({ createdAt: -1 })
            .populate('products.productId', 'title'); // Only fetch the "title" field.

        if (!orders) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
};

const getInvoice = (req, res) => {
    try {
        const { orderId } = req.params;
        const invoicePath = path.join(__dirname, '../../../invoices', `invoice_${orderId}.pdf`);
        
        console.log('Looking for invoice at:', invoicePath); // Debug log
  
        if (!fs.existsSync(invoicePath)) {
            console.error(`Invoice not found: ${invoicePath}`);
            return res.status(404).json({ message: 'Invoice not found' });
        }
  
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="invoice_${orderId}.pdf"`);
        res.sendFile(invoicePath);
    } catch (error) {
        console.error('Error serving invoice:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createAOrder,
    getOrderByEmail,
    getInvoice,
};