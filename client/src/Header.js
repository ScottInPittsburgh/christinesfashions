import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <nav className="nav-container">
                <ul className="menu-bar">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><Link to="/collection/products" className={location.pathname === '/collection/products' ? 'active' : ''}>Shop</Link></li>
                    <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login/Register</Link></li>
                    <li><Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
                        <i className="fas fa-shopping-cart"></i> Cart
                    </Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
