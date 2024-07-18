const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoUri = process.env.MONGO_URI || "mongodb+srv://scottdrickman27:Fc1M6Jft6ycdVZvr@cluster0.gmyhuuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    stock: Number,
});

const Product = mongoose.model('Product', productSchema);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/products', upload.single('image'), (req, res) => {
    const { name, description, price, imageUrl, stock } = req.body;
    const file = req.file;

    if (file) {
        const params = {
            Bucket: 'christinesfashions',
            Key: `${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        s3.upload(params, async (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            const product = new Product({
                name,
                description,
                price,
                imageUrl: data.Location,
                stock
            });

            try {
                await product.save();
                res.status(201).send(product);
            } catch (error) {
                res.status(500).send(error);
            }
        });
    } else {
        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            stock
        });

        product.save()
            .then(product => res.status(201).send(product))
            .catch(error => res.status(500).send(error));
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send();
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).send();
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
