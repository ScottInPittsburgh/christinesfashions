import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Product() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log('Fetching product with id:', id);
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`);
                console.log('API response:', response);
                if (response.headers['content-type'].includes('application/json')) {
                    setProduct(response.data);
                } else {
                    console.error('Expected JSON response but received:', response.headers['content-type']);
                    setError('Invalid response format');
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = {
            ...product,
            price: product.price ? parseFloat(product.price) : 0,
            stock: product.stock ? parseInt(product.stock) : 0,
            quantity: 1,
            totalPrice: product.price ? parseFloat(product.price) : 0
        };
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    };

    if (error) {
        return <div>Error loading product: {error.message}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header>
                <nav>
                    <ul className="menu-bar">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/cart">Shopping Cart</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className="product-detail-container">
                    <h1>{product.name}</h1>
                    <div className="product-detail">
                        {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="product-detail-image" />}
                        <div className="product-detail-info">
                            <p>{product.description}</p>
                            <p>Price: {product.price ? `$${parseFloat(product.price).toFixed(2)}` : 'N/A'}</p>
                            <p>Stock: {product.stock ? parseInt(product.stock) : 'N/A'}</p>
                            <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Product;
