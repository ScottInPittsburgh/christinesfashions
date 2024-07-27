import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const AdminOrderHistory = () => {
    console.log('AdminOrderHistory component rendering');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('AdminOrderHistory component mounted');
        const fetchOrders = async () => {
            console.log('Fetching orders...');
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/orders`, {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                });
                console.log('Orders received:', response.data);
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders. Please try again later.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    console.log('Rendering AdminOrderHistory, orders:', orders);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="admin-order-history-container">
            <h1>All Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order._id} className="order-item">
                            <h3>Order ID: {order._id}</h3>
                            <p>User ID: {order.user}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                            <p>Status: {order.status}</p>
                            <h4>Products:</h4>
                            <ul>
                                {order.products && order.products.length > 0 ? (
                                    order.products.map((product, index) => (
                                        <li key={index}>{product ? product.name : 'Unknown Product'}</li>
                                    ))
                                ) : (
                                    <li>No products in this order</li>
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/admin" className="back-to-admin">Back to Admin Dashboard</Link>
        </div>
    );
};

export default AdminOrderHistory;