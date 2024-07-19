import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import heroImage from './images/content/hero-image.jpg';
import id1image from './images/content/id1image.jpg';
import id2image from './images/content/id2image.jpg';
import id3image from './images/content/id3image.jpg';
import Footer from './Footer';
import CollectionCard from './CollectionCard';
import ProductCard from './ProductCard';

const newArrivals = [
    { id: 1, name: 'Summer Tee', description: 'Light and breezy', price: 29.99, imageUrl: id1image, link: '/productpage/1' },
    { id: 2, name: 'Cozy Hoodie', description: 'Perfect for chilly days', price: 49.99, imageUrl: id2image, link: '/productpage/2' },
];

const collections = [
    { id: 1, title: "T-Shirts", text: "Comfortable and stylish tees", url: "/collection/t-shirts", imageUrl: id1image },
    { id: 2, title: "Hoodies", text: "Stay warm and look cool", url: "/collection/hoodies-sweatshirts", imageUrl: id2image },
    { id: 3, title: "Accessories", text: "Complete your look", url: "/collection/accessories", imageUrl: id3image },
];

const Home = () => {
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
            <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1>Christine's Fashions</h1>
            </div>
            <main>
                <section className="new-arrivals">
                    <h2>New Arrivals</h2>
                    <div className="tile-grid">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </section>

                <section className="collections">
                    <h2>Our Collections</h2>
                    <div className="tile-grid">
                        {collections.map(collection => (
                            <CollectionCard key={collection.id} {...collection} />
                        ))}
                    </div>
                </section>

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

export default Home;