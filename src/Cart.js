import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
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
                <h1>Shopping Cart</h1>
                <p>Your shopping cart is empty.</p>
            </main>
        </div>
    );
}

export default Cart;
