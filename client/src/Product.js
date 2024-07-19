import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Product() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        console.log('Fetching product with id:', id); // Log the id to ensure it's being passed correctly
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`);
                console.log('Fetched product data:', response.data); // Log the response data
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = { ...product, quantity: 1, totalPrice: product.price };
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
                        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
                        <div className="product-detail-info">
                            <p>{product.description}</p>
                            <p>Price: ${product.price?.toFixed(2)}</p> {/* Optional chaining to prevent undefined error */}
                            <p>Stock: {product.stock}</p>
                            <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Product;
