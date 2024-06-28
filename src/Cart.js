import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
//test
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
                <div className="cart-content">
                    <p>Your cart is currently empty.</p>
                    <div className="cart-box">
                        <p>Sample product in cart</p>
                        <p>Quantity: 1</p>
                        <p>Price: $00.00</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Cart;
