import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { useAuth } from './AuthContext';

const CartItem = ({ item, onRemove }) => (
    <div className="cart-item">
        <div className="cart-item-details">
            <h3>{item.color}</h3>
            <p>Price: ${item.totalPrice ? item.totalPrice.toFixed(2) : '0.00'}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => onRemove(item.id)} className="remove-item-button">Remove</button>
        </div>
    </div>
);

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showDemoMessage, setShowDemoMessage] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setCartItems(items);
    }, []);

    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
                userId: user.userId,
                products: cartItems.map(item => item.id),
                totalAmount: totalAmount
            });
            console.log('Order created:', response.data);
            setCartItems([]);
            localStorage.removeItem('cart');
            setShowDemoMessage(true);
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.totalPrice * item.quantity), 0);

    return (
        <div className="cart-container">
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