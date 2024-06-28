import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Home() {
    return (
        <div>
            <header>
                <nav>
                    <ul className="menu-bar">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/product">Product Page</Link></li>
                        <li><Link to="/cart">Shopping Cart</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Welcome to Christine's Fashions</h1>
                <div className="product-grid">
                    <div className="product-box">
                        <Link to="/product">
                            <h2>Product 1</h2>
                            <p>Short description of product 1</p>
                        </Link>
                    </div>
                    <div className="product-box">
                        <Link to="/product">
                            <h2>Product 2</h2>
                            <p>Short description of product 2</p>
                        </Link>
                    </div>
                    <div className="product-box">
                        <Link to="/product">
                            <h2>Product 3</h2>
                            <p>Short description of product 3</p>
                        </Link>
                    </div>
                    <div className="product-box">
                        <Link to="/product">
                            <h2>Product 4</h2>
                            <p>Short description of product 4</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
