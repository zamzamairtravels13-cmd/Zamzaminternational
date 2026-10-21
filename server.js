const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb+srv://mahfuzhossainmugdho_db_user:Zamzam12345@cluster0.4pzarwq.mongodb.net/zamzam_db?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Database Connected Successfully!'))
    .catch(err => console.error('Database Connection Error:', err));

app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, phone, email, address, productName, quantity, totalPrice, paymentMethod, notes } = req.body;

        const newOrder = new Order({
            customerName,
            phone,
            email: email || 'N/A',
            address,
            productName,
            quantity,
            totalPrice,
            paymentMethod: paymentMethod || 'Cash On Delivery',
            notes: notes || 'N/A' // স্পেশাল নোট সেভ করা
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: 'Order placed successfully!', orderId: newOrder._id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));