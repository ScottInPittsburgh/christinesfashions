import React, { useState, useEffect } from 'react';
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
            // Simulate fetching products from a backend
            const initialProducts = [
                { id: 1, name: 'Sample Product 1', description: 'Description 1', price: 19.99, imageUrl: '/images/sample1.jpg', stock: 10 },
                { id: 2, name: 'Sample Product 2', description: 'Description 2', price: 29.99, imageUrl: '/images/sample2.jpg', stock: 5 },
            ];
            setProducts(initialProducts);
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
        const id = products.length ? products[products.length - 1].id + 1 : 1;
        setProducts([...products, { ...newProduct, id }]);
        setNewProduct({ id: '', name: '', description: '', price: '', imageUrl: '', stock: '' });
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleUpdate = (id, updatedProduct) => {
        setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
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
                    <div key={product.id} className="product-item">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price.toFixed(2)}</p>
                        <p>Stock: {product.stock}</p>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                        <button onClick={() => handleUpdate(product.id, { ...product, stock: product.stock - 1 })}>Decrement Stock</button>
                        <button onClick={() => handleUpdate(product.id, { ...product, stock: product.stock + 1 })}>Increment Stock</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
