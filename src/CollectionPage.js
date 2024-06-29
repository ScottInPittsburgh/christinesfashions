import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRedoAlt, FaChevronDown, FaTimes } from 'react-icons/fa';
import styles from './CollectionPage.module.scss';

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
            const mockProducts = [
                { id: 1, name: 'T-Shirt', price: 19.99, color: 'red', size: 'M', type: 't-shirt' },
                { id: 2, name: 'Hoodie', price: 39.99, color: 'blue', size: 'L', type: 'hoodie' },
                { id: 3, name: 'Cap', price: 14.99, color: 'black', size: 'One Size', type: 'accessory' },
            ];
            setProducts(mockProducts);
            setFilteredProducts(mockProducts);
            setIsLoading(false);
        };

        fetchProducts();
    }, [slugId, navigate]);

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
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (value === 'price: low-high') return a.price - b.price;
            if (value === 'price: high-low') return b.price - a.price;
            return 0;
        });
        setFilteredProducts(sortedProducts);
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
                <button onClick={() => handleSortBy('newest')}>Newest</button>
                <button onClick={() => handleSortBy('price: low-high')}>Price: Low to High</button>
                <button onClick={() => handleSortBy('price: high-low')}>Price: High to Low</button>
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
                        <div key={product.id} className={styles.productCard}>
                            <h3>{product.name}</h3>
                            <p>${product.price.toFixed(2)}</p>
                            <p>Color: {product.color}</p>
                            <p>Size: {product.size}</p>
                            <p>Type: {product.type}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollectionPage;