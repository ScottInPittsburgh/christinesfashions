import React from 'react';
import './styles.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-instagram"></i>
            </div>
            <div className="footer-container">
                <div className="column">
                    <h3>Contact Us</h3>
                    <p>christinesfashions3@gmail.com</p>
                </div>
                <div className="column">
                    <h3>Customers</h3>
                    <p>Return Policy</p>
                    <p>FAQ</p>
                </div>
                <div className="column">
                    <h3>Company</h3>
                    <p>About Us</p>
           
                </div>
            </div>
        </footer>
    );
};

export default Footer;
