const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB Client
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

// Create a new product
app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, description, price, stock } = req.body;
    const file = req.file;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    s3.upload(params, async (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            imageUrl: data.Location,
            stock: parseInt(stock),
        };

        try {
            const database = client.db('christinesfashions');
            const products = database.collection('products');
            const result = await products.insertOne(newProduct);
            res.status(201).json(result.ops[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

// Read all products
app.get('/api/products', async (req, res) => {
    try {
        const database = client.db('christinesfashions');
        const products = database.collection('products');
        const allProducts = await products.find({}).toArray();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const database = client.db('christinesfashions');
        const products = database.collection('products');
        const result = await products.updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: { name, description, price: parseFloat(price), stock: parseInt(stock) } }
        );

        if (!result.matchedCount) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const database = client.db('christinesfashions');
        const products = database.collection('products');
        const result = await products.deleteOne({ _id: ObjectId(req.params.id) });

        if (!result.deletedCount) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
