require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

    const allowedOrigins = [
        'https://christinesfashions.com',
        'http://localhost:3000', 
        'http://127.0.0.1:3000'  
    ];

// app.use(cors({
//     origin: 'https://christinesfashions.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log('Uploading file:', file);
            cb(null, Date.now().toString() + file.originalname);
        }
    })
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    stock: Number,
});

const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalAmount: Number,
    status: String,
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

app.get('/api/test-db', async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.json({ message: 'Database connection successful' });
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ error: 'Database connection failed', details: error.message, stack: error.stack });
    }
});

app.get('/api/products', async (req, res) => {
    console.log('GET /api/products request received');
    try {
        const products = await Product.find();
        console.log(`Found ${products.length} products`);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products', details: error.message, stack: error.stack });
    }
});

app.get('/api/products/:id', async (req, res) => {
    console.log(`GET /api/products/${req.params.id} request received`);
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Error fetching product', details: error.message, stack: error.stack });
    }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    console.log('POST /api/products request received');
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.file ? req.file.location : null,
            stock: req.body.stock,
        });
        await newProduct.save();
        console.log('New product saved:', newProduct);
        res.json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Error adding product', details: error.message, stack: error.stack });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    console.log(`DELETE /api/products/${req.params.id} request received`);
    try {
        await Product.findByIdAndDelete(req.params.id);
        console.log('Product deleted');
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product', details: error.message, stack: error.stack });
    }
});

app.put('/api/products/:id', async (req, res) => {
    console.log(`PUT /api/products/${req.params.id} request received`);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Product updated:', updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product', details: error.message, stack: error.stack });
    }
});

app.post('/api/users/register', async (req, res) => {
    console.log('POST /api/users/register request received');
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user', details: error.message, stack: error.stack });
    }
});

app.post('/api/users/login', async (req, res) => {
    console.log('POST /api/users/login request received');
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.json({ userId: user._id, username: user.username });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in', details: error.message, stack: error.stack });
    }
});

app.post('/api/orders', async (req, res) => {
    console.log('POST /api/orders request received');
    try {
        const { userId, products, totalAmount } = req.body;
        const order = new Order({
            user: userId,
            products,
            totalAmount,
            status: 'pending',
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order', details: error.message, stack: error.stack });
    }
});

app.get('/api/orders/:userId', async (req, res) => {
    console.log(`GET /api/orders/${req.params.userId} request received`);
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('products');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders', details: error.message, stack: error.stack });
    }
});

app.get('/api/admin/orders', async (req, res) => {
    console.log('GET /api/admin/orders request received');
    try {
        const orders = await Order.find().populate('user', 'username').populate('products', 'name');
        console.log('Orders found:', orders.length);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching admin orders:', error);
        res.status(500).json({ error: 'Error fetching admin orders', details: error.message });
    }
});

app.get('/test-aws', (req, res) => {
    s3.listBuckets((err, data) => {
        if (err) {
            console.error("Error", err);
            res.status(500).json({ error: "Error connecting to AWS", details: err.message });
        } else {
            console.log("Success", data.Buckets);
            res.json({ message: "Successfully connected to AWS", buckets: data.Buckets });
        }
    });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});