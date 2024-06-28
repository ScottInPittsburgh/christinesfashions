import React from 'react';
import { Link } from 'react-router-dom';

function Product() {
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
                <h1>Product Page</h1>
                <p>Details about the product.</p>
            </main>
        </div>
    );
}

export default Product;
