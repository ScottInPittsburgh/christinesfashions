import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Home() {
    // Mock product data
    const products = [
        { id: 1, name: "Summer Dress", description: "Light and breezy summer dress", price: 59.99 },
        { id: 2, name: "Denim Jacket", description: "Classic denim jacket for all seasons", price: 79.99 },
        { id: 3, name: "Floral Blouse", description: "Elegant floral print blouse", price: 39.99 },
        { id: 4, name: "Leather Boots", description: "Stylish leather boots for any occasion", price: 129.99 }
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
                <h1>Welcome to Christine's Fashions</h1>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-box">
                            <Link to={`/product/${product.id}`}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;