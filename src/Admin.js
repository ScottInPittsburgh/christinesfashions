import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuth } from './AuthContext';

const Admin = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        stock: '',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [isAuthenticated, navigate]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('price', newProduct.price);
            formData.append('image', newProduct.imageUrl); // Assuming imageUrl is a file input
            formData.append('stock', newProduct.stock);

            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/products`, formData);
            setProducts([...products, response.data]);
            setNewProduct({ id: '', name: '', description: '', price: '', imageUrl: '', stock: '' });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleUpdate = async (id, updatedProduct) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`, updatedProduct);
            setProducts(products.map(product => (product._id === id ? response.data : product)));
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Page</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Product Name" required />
                <input type="text" name="description" value={newProduct.description} onChange={handleChange} placeholder="Description" required />
                <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" required />
                <input type="file" name="imageUrl" onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.files[0] })} required />
                <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} placeholder="Stock" required />
                <button type="submit">Add Product</button>
            </form>
            <h2>Product List</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-item">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price.toFixed(2)}</p>
                        <p>Stock: {product.stock}</p>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                        <button onClick={() => handleUpdate(product._id, { ...product, stock: product.stock - 1 })}>Decrement Stock</button>
                        <button onClick={() => handleUpdate(product._id, { ...product, stock: product.stock + 1 })}>Increment Stock</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
