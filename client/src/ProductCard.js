import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ProductCard = ({ _id, name, description, price, imageUrl, link }) => {
    return (
        <div className="product-card tile">
            <img src={imageUrl} alt={name} className="product-image" />
            <div className="product-content">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>Price: ${price.toFixed(2)}</p>
                <Link to={link} className="view-product-button">View Product</Link>
            </div>
        </div>
    );
};

export default ProductCard;
