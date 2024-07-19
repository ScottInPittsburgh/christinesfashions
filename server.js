require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGODB_URI;

// MongoDB connection
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// AWS S3 configuration
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname);
        }
    })
});

// MongoDB schema and model
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    stock: Number,
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/products', async (req, res) => {
    try {
        console.log("Fetching products...");
        const products = await Product.find();
        console.log("Products:", products);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.file.location,
            stock: req.body.stock,
        });
        await newProduct.save();
        console.log("Product added:", newProduct);
        res.json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: 'Error adding product' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        console.log("Product deleted:", req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Product updated:", updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
