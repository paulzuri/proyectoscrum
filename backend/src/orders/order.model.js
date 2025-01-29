const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String, // Ahora el campo 'address' será un solo string (dirección completa)
        required: true
    },
    referencia: { // Nuevo campo
        type: String,
        required: true,
    },
    phone: { type: Number, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
