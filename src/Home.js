import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import heroImage from './images/content/hero-image.jpg';
import id1image from './images/content/id1image.jpg';
import id2image from './images/content/id2image.jpg';
import id3image from './images/content/id3image.jpg';

const CollectionCard = ({ title, text, url, imageUrl }) => (
    <div className="collection-card tile">
        <img src={imageUrl} alt={title} className="collection-image" />
        <div className="collection-content">
            <h3>{title}</h3>
            <p>{text}</p>
            <Link to={url} className="shop-button">Shop {title}</Link>
        </div>
    </div>
);

const ProductCard = ({ name, description, price, imageUrl }) => (
    <div className="new-arrival-card tile">
        <img src={imageUrl} alt={name} className="new-arrival-image" />
        <div className="new-arrival-content">
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="product-price">${price.toFixed(2)}</p>
            <Link to="/product/1" className="view-product-button">View Product</Link>
        </div>
    </div>
);

const collections = [
    { id: 1, title: "T-Shirts", text: "Comfortable and stylish tees", url: "/collection/t-shirts", imageUrl: id1image },
    { id: 2, title: "Hoodies", text: "Stay warm and look cool", url: "/collection/hoodies-sweatshirts", imageUrl: id2image },
    { id: 3, title: "Accessories", text: "Complete your look", url: "/collection/accessories", imageUrl: id3image },
];

const newArrivals = [
    { id: 1, name: "Summer Tee", description: "Light and breezy", price: 29.99, imageUrl: id1image },
    { id: 2, name: "Cozy Hoodie", description: "Perfect for chilly days", price: 49.99, imageUrl: id2image },
];

const Home = () => {
    const location = useLocation();

    return (
        <div>
            <header className="header">
                <nav>
                    <ul className="menu-bar">
                        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>Shopping Cart</Link></li>
                        <li><Link to="/collection/products" className={location.pathname === '/collection/products' ? 'active' : ''}>All Products</Link></li>
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
        </div>
    );
}

export default Home;
