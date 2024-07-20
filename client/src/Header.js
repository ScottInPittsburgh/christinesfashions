import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles.css';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul className="menu-bar">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cart">Shopping Cart</Link></li>
                    {isAuthenticated ? (
                        <li><button onClick={logout}>Logout</button></li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;