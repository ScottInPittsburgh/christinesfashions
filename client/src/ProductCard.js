import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ProductCard = ({ id, _id, name, description, price, imageUrl, link }) => {
    const productLink = link ? link : `/product/${_id}`;
    return (
        <div className="product-card tile">
            <img src={imageUrl} alt={name} className="product-image" />
            <div className="product-content">
                <h3>{name}</h3>
                <p>{description}</p>
                <p className="product-price">${price.toFixed(2)}</p>
                <Link to={productLink} className="view-product-button">View Product</Link>
            </div>
        </div>
    );
}

export default ProductCard;
