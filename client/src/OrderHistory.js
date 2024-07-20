import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import './styles.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/${user.userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (user && user.userId) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="order-history-container">
            <h1>Your Order History</h1>
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order._id} className="order-item">
                            <h3>Order ID: {order._id}</h3>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                            <p>Status: {order.status}</p>
                            <h4>Products:</h4>
                            <ul>
                                {order.products.map(product => (
                                    <li key={product._id}>{product.name}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/" className="back-to-shop">Back to Shop</Link>
        </div>
    );
};

export default OrderHistory;