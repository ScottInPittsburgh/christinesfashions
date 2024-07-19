import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import ProductCard from './ProductCard';

const CollectionPage = () => {
    const { type } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
                const filteredProducts = response.data.filter(product => product.description.includes(`(${type})`));
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [type]);

    return (
        <div className="collection-container">
            <h1>{type} Collection</h1>
            <div className="tile-grid">
                {products.map(product => (
                    <ProductCard key={product._id} {...product} link={`/product/${product._id}`} />
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;
