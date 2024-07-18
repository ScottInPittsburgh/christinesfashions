import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, name, description, price, imageUrl }) => (
    <div className="new-arrival-card tile">
        <img src={imageUrl} alt={name} className="new-arrival-image" />
        <div className="new-arrival-content">
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="product-price">${price.toFixed(2)}</p>
            <Link to={`/product/${id}`} className="view-product-button">View Product</Link>
        </div>
    </div>
);

export default ProductCard;
