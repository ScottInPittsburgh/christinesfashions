import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { useAuth } from './AuthContext';

const CartItem = ({ item, onRemove }) => (
    <div className="cart-item">
        <div className="cart-item-details">
            <h3>{item.color}</h3>
            <p>Size: {item.size}</p>
            <p>Price: ${item.totalPrice ? parseFloat(item.totalPrice).toFixed(2) : '0.00'}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => onRemove(item._id)} className="remove-item-button">Remove</button>
        </div>
    </div>
);

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showDemoMessage, setShowDemoMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setCartItems(items);
    }, []);

    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/cart' } });
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
                userId: user.userId,
                products: cartItems.map(item => item._id),
                totalAmount
            });
            console.log('Order created:', response.data);

            for (const item of cartItems) {
                if (item._id) {
                    await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${item._id}`, {
                        stock: item.stock - item.quantity
                    });
                } else {
                    console.error('Product ID is undefined for item:', item);
                }
            }

            setCartItems([]);
            localStorage.removeItem('cart');
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowDemoMessage(true);
            }, 3000);
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + (parseFloat(item.totalPrice) * item.quantity), 0);

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
                                <CartItem key={item._id} item={item} onRemove={handleRemoveItem} />
                            ))}
                            <div className="cart-summary">
                                <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
                                <button onClick={handleCheckout} className="checkout-button">
                                    {isAuthenticated ? 'Checkout' : 'Login to Checkout'}
                                </button>
                            </div>
                        </div>
                    )}
                    {showSuccessMessage && (
                        <div className="success-message">
                            <p>Checkout successful! Your order has been placed.</p>
                        </div>
                    )}
                    {showDemoMessage && (
                        <div className="demo-message">
                            <p>This site is a demo and not a real site.</p>
                        </div>
                    )}
                </div>
                {!isAuthenticated && (
                    <p className="authentication-msg">
                        Please <Link to="/login" className="login-link" style={{ color: '#007bff', marginLeft: '5px', marginRight: '5px' }}>login or create an account</Link> to complete your order.
                    </p>
                )}

            </main>
        </div>
    );
};

export default Cart;