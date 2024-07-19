import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Product() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

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
                <h1>Product Page</h1>
                <div className="product-detail">
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} alt={product.name} />
                    <p>{product.description}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <p>Stock: {product.stock}</p>
                </div>
            </main>
        </div>
    );
}

export default Product;