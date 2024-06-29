import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// Simplified CollectionCard component
const CollectionCard = ({ title, text, url, imageUrl }) => (
    <div className="collection-card">
        <img src={imageUrl} alt={title} className="collection-image" />
        <div className="collection-content">
            <h3>{title}</h3>
            <p>{text}</p>
            <Link to={url} className="shop-button">Shop {title}</Link>
        </div>
    </div>
);

// Simplified ProductCard component
const ProductCard = ({ name, description, price, imageUrl }) => (
    <div className="product-card">
        <img src={imageUrl} alt={name} className="product-image" />
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="product-price">${price.toFixed(2)}</p>
        <Link to="/product/1" className="view-product-button">View Product</Link>
    </div>
);

function Home() {
    // Mock data for collections and products
    const collections = [
        { id: 1, title: "T-Shirts", text: "Comfortable and stylish tees", url: "/collection/tshirts", imageUrl: "./images/content/id1image.jpg" },
        { id: 2, title: "Hoodies", text: "Stay warm and look cool", url: "/collection/hoodies", imageUrl: "./images/content/id2mage.jpg" },
        { id: 3, title: "Accessories", text: "Complete your look", url: "/collection/accessories", imageUrl: "./images/content/id3image.jpg" },
    ];


    const newArrivals = [
        { id: 1, name: "Summer Tee", description: "Light and breezy", price: 29.99, imageUrl: "https://via.placeholder.com/300x200" },
        { id: 2, name: "Cozy Hoodie", description: "Perfect for chilly days", price: 49.99, imageUrl: "https://via.placeholder.com/300x200" },
        // Add more products as needed
    ];


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
                <section className="hero">
                    <h1>Welcome to Christine's Fashions</h1>
                    <p>Discover your style with our latest collections</p>
                </section>

                <section className="new-arrivals">
                    <h2>New Arrivals</h2>
                    <div className="product-grid">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </section>

                <section className="collections">
                    <h2>Our Collections</h2>
                    <div className="collection-grid">
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