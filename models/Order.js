const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: 'N/A' },
    address: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Cash On Delivery' },
    notes: { type: String, default: 'N/A' }, // স্পেশাল নোটের জন্য ফিল্ড
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);