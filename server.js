require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

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

app.use(cors({
    origin: 'https://christinesfashions.com',
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