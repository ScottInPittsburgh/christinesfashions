import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import ProductCard from './ProductCard';
import Footer from './Footer';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <main>
                <section className="all-products">
                    <h2>All Products</h2>
                    <div className="tile-grid">
                        {products.map(product => (
                            <ProductCard key={product._id} {...product} link={`/product/${product._id}`} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AllProducts;
