import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRedoAlt, FaChevronDown, FaTimes } from 'react-icons/fa';
import styles from './CollectionPage.module.scss';
import Footer from './Footer';

const validSlugs = ['products', 't-shirts', 'hoodies-sweatshirts', 'accessories'];

const CollectionPage = () => {
    const navigate = useNavigate();
    const { id: slugId } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterConditions, setFilterConditions] = useState({});
    const [sortBy, setSortBy] = useState('newest');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!validSlugs.includes(slugId)) {
            navigate('/');
        }

        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setIsLoading(false);
        };

        fetchProducts();
    }, [slugId, navigate]);

    useEffect(() => {
        const sortProducts = (products) => {
            return [...products].sort((a, b) => {
                if (sortBy === 'price: low-high') return a.price - b.price;
                if (sortBy === 'price: high-low') return b.price - a.price;
                return 0;
            });
        };

        setFilteredProducts(sortProducts(filteredProducts));
    }, [sortBy, filteredProducts]);

    const handleFilter = (property, value) => {
        const newFilterConditions = { ...filterConditions };
        if (newFilterConditions[property]?.includes(value)) {
            newFilterConditions[property] = newFilterConditions[property].filter(item => item !== value);
            if (newFilterConditions[property].length === 0) delete newFilterConditions[property];
        } else {
            newFilterConditions[property] = [...(newFilterConditions[property] || []), value];
        }
        setFilterConditions(newFilterConditions);

        const newFilteredProducts = products.filter(product =>
            Object.entries(newFilterConditions).every(([key, values]) =>
                values.includes(product[key])
            )
        );
        setFilteredProducts(newFilteredProducts);
    };

    const handleSortBy = (value) => {
        setSortBy(value);
    };

    const handleClearFilters = () => {
        setFilterConditions({});
        setFilteredProducts(products);
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.collectionPage}>
            <div className={styles.filterSection}>
                <button onClick={() => handleSortBy('newest')} className={sortBy === 'newest' ? styles.active : ''}>Newest</button>
                <button onClick={() => handleSortBy('price: low-high')} className={sortBy === 'price: low-high' ? styles.active : ''}>Price: Low to High</button>
                <button onClick={() => handleSortBy('price: high-low')} className={sortBy === 'price: high-low' ? styles.active : ''}>Price: High to Low</button>
                <div className={styles.filterDropdown}>
                    Filter <FaChevronDown />
                    <div className={styles.filterOptions}>
                        {['color', 'size', 'type'].map(property => (
                            <div key={property}>
                                <h4>{property}</h4>
                                {[...new Set(products.map(product => product[property]))].map(value => (
                                    <button
                                        key={value}
                                        onClick={() => handleFilter(property, value)}
                                        className={filterConditions[property]?.includes(value) ? styles.active : ''}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {Object.keys(filterConditions).length > 0 && (
                    <button onClick={handleClearFilters} className={styles.clearAll}>
                        Clear All <FaRedoAlt />
                    </button>
                )}
            </div>

            <div className={styles.activeFilters}>
                {Object.entries(filterConditions).map(([property, values]) =>
                    values.map(value => (
                        <span key={`${property}-${value}`} className={styles.filterTag}>
                            {value}
                            <FaTimes onClick={() => handleFilter(property, value)} />
                        </span>
                    ))
                )}
            </div>

            {filteredProducts.length === 0 ? (
                <p className={styles.noResults}>No products match your selection. Try using fewer filters.</p>
            ) : (
                <div className={styles.productGrid}>
                    {filteredProducts.map(product => (
                        <div key={product._id} className={styles.productCard}>
                            <h3>{product.name}</h3>
                            <p>${product.price.toFixed(2)}</p>
                            <p>Color: {product.color}</p>
                            <p>Size: {product.size}</p>
                            <p>Type: {product.type}</p>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CollectionPage;