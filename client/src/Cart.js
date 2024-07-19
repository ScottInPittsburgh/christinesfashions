import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const CartItem = ({ item, onRemove }) => (
    <div className="cart-item">
        <div className="cart-item-details">
            <h3>{item.color}</h3>
            <p>Price: ${item.totalPrice.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => onRemove(item.id)} className="remove-item-button">Remove</button>
        </div>
    </div>
);

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showDemoMessage, setShowDemoMessage] = useState(false);

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        setShowDemoMessage(true);
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart'));
        setCartItems(items);
    }, []);

    return (
        <div>
            <header>
                <nav>
                    <ul className="menu-bar">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Shopping Cart</h1>
                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <p>Your cart is currently empty.</p>
                    ) : (
                        <div>
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
                            ))}
                            <div className="cart-summary">
                                <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
                                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
                            </div>
                        </div>
                    )}
                    {showDemoMessage && (
                        <div className="demo-message">
                            <p>This site is a demo and not a real site.</p>
                        </div>
                    )}
                </div>
                <Link to="/login" className="login-link">Login to your account</Link>
            </main>
        </div>
    );
};

export default Cart;
