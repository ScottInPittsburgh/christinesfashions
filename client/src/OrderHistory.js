import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
                    headers: { 'x-auth-token': user.token }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        if (user) fetchOrders();
    }, [user]);

    return (
        <div>
            <h2>Order History</h2>
            {orders.map(order => (
                <div key={order._id}>
                    <p>Order ID: {order._id}</p>
                    <p>Total Amount: ${order.totalAmount}</p>
                    <p>Status: {order.status}</p>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;