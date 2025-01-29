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
  
        // Create invoices directory
        const invoicesDir = path.join(__dirname, '../../../invoices');
        if (!fs.existsSync(invoicesDir)) {
            fs.mkdirSync(invoicesDir, { recursive: true });
        }
  
        // Generate PDF invoice
        const invoicePath = path.join(invoicesDir, `invoice_${savedOrder._id}.pdf`);
        await generateInvoice(savedOrder, invoicePath); // Await the PDF generation
  
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).json({ message: 'Failed to create order' });
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