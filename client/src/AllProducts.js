import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import ProductCard from './ProductCard';
import Footer from './Footer';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <header className="header">
                <nav className="nav-container">
                    <ul className="menu-bar">
                        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>Shopping Cart</Link></li>
                        <li><Link to="/collection/products" className={location.pathname === '/collection/products' ? 'active' : ''}>All Products</Link></li>
                        <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section className="all-products">
                    <h2>All Products</h2>
                    <div className="tile-grid">
                        {products.map(product => (
                            <ProductCard key={product._id} {...product} link={`/product/${product._id}`} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AllProducts;
