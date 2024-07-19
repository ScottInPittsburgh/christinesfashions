import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const CollectionCard = ({ title, text, url, imageUrl }) => (
    <div className="collection-card tile">
        <img src={imageUrl} alt={title} className="collection-image" />
        <div className="collection-content">
            <h3>{title}</h3>
            <p>{text}</p>
            <Link to={url} className="view-collection-button">View Collection</Link>
        </div>
    </div>
);

export default CollectionCard;
