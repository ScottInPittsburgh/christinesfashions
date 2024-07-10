import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const CartItem = ({ item, onRemove }) => (
    <div className="cart-item">
        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
        <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => onRemove(item.id)} className="remove-item-button">Remove</button>
        </div>
    </div>
);

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Summer Tee', price: 29.99, quantity: 1, imageUrl: '/images/content/id1image.jpg' },
        { id: 2, name: 'Cozy Hoodie', price: 49.99, quantity: 2, imageUrl: '/images/content/id2image.jpg' },
    ]);

    const [showDemoMessage, setShowDemoMessage] = useState(false);

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        setShowDemoMessage(true);
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <header>
                <nav>
                    <ul className="menu-bar">
                        <li><Link to="/">Home</Link></li>
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
            </main>
        </div>
    );
};

export default Cart;
