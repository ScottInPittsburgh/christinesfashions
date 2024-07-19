import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ _id, name, description, price, imageUrl }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${_id}`}>
                <img src={imageUrl} alt={name} className="product-image" />
                <h3>{name}</h3>
                <p>{description}</p>
                <p>Price: ${price.toFixed(2)}</p>
            </Link>
        </div>
    );
};

export default ProductCard;