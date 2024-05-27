import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Christine's Fashions</h1>
            <nav>
                <ul>
                    <li><Link to="/cart">Shopping Cart</Link></li>
                    <li><Link to="/product">Product Page</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
