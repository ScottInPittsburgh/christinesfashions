import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import heroImage from './images/content/hero-image.jpg';
import Footer from './Footer';

const Home = () => {
    const location = useLocation();

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
            </main>
            <Footer />
        </div>
    );
}

export default Home;
