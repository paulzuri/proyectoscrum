const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateInvoice = (order, filePath) => {
    try {
        const doc = new PDFDocument({ margin: 50 });
        
        // Create write stream with error handling
        const stream = fs.createWriteStream(filePath);
        
        stream.on('error', (err) => {
            console.error('File stream error:', err);
            throw err;
        });

        doc.pipe(stream);

        // Header
        doc.fontSize(20).text('Factura', { align: 'center' });
        doc.moveDown();

        // Order Details
        doc.fontSize(12)
            .text(`Orden número: ${order._id}`, { align: 'left' })
            .text(`Nombre: ${order.name}`)
            .text(`Email: ${order.email}`)
            .text(`Dirección: ${order.address}`)
            .text(`Teléfono: ${order.phone}`)
            .text(`Precio final: $${order.totalPrice}`);
        doc.moveDown();

        // Products
        doc.text('Productos:', { underline: true });
        order.products.forEach((product, index) => {
            const productTitle = product.productId?.title || 'Producto desconocido';
            doc.text(`${index + 1}. ${productTitle} - Cantidad: ${product.quantity}`);
        });

        // Footer
        doc.moveDown();
        doc.text('¡Gracias por elegir Frizi!', { align: 'center' });

        doc.end();
        
        return true;
    } catch (error) {
        console.error('PDF generation failed:', error);
        throw error;
    }
};

module.exports = generateInvoice;