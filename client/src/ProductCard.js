import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ProductCard = ({ _id, name, description, price, imageUrl, link, customStyles, title = "" }) => {
    return (
        <div className={customStyles ? "custom-collection-card tile" : "product-card tile"}>
            <img src={imageUrl} alt={title} className={customStyles ? "new-arrival-image" : "product-image"} />

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
