import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { useAuth } from './AuthContext';

const Admin = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
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
            axios.get('/api/products')
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setProducts(response.data);
                    } else {
                        console.error('Expected an array but got:', response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error fetching the products!', error);
                });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/products', newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                setNewProduct({ name: '', description: '', price: '', imageUrl: '', stock: '' });
            })
            .catch(error => {
                console.error('There was an error adding the product!', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`/api/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product._id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    const handleUpdate = (id, updatedProduct) => {
        axios.put(`/api/products/${id}`, updatedProduct)
            .then(response => {
                setProducts(products.map(product => product._id === id ? response.data : product));
            })
            .catch(error => {
                console.error('There was an error updating the product!', error);
            });
    };

    return (
        <div className="admin-container">
            <h1>Admin Page</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Product Name" required />
                <input type="text" name="description" value={newProduct.description} onChange={handleChange} placeholder="Description" required />
                <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" required />
                <input type="text" name="imageUrl" value={newProduct.imageUrl} onChange={handleChange} placeholder="Image URL" required />
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
