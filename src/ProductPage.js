import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './ProductPage.module.scss';

const ProductColors = ({ thumbnail, isSelected }) => (
    <div className={`${styles.color_image_container} ${isSelected ? styles.selected : ''}`}>
        <img src={thumbnail} alt="Product color" className={styles.color_thumbnail} />
    </div>
);

const ProductSize = ({ value, isSelected, isOutOfStock }) => (
    <div className={`${styles.size} ${isSelected ? styles.fill : ''} ${isOutOfStock ? styles.no_stock : ''}`}>
        {value.toUpperCase()}
    </div>
);

const ProductTags = ({ tags }) => (
    <div className={styles.tags_wrapper}>
        {tags.map((tag, index) => (
            <span key={index} className={tag === 'new' ? styles.tag_alt : styles.tag}>
        {tag}
      </span>
        ))}
    </div>
);

const ProductPage = () => {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

    // Mock data
    const product = {
        name: "Sample Product",
        description: "This is a sample product description.",
        price: 99.99,
        discountedPrice: 79.99,
        colors: ["Red", "Blue", "Green"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["new", "sale"],
        images: ["https://via.placeholder.com/400x600", "https://via.placeholder.com/400x600"]
    };

    return (
        <section className={isBigScreen ? styles.container_b : styles.container_s}>
            <div className={styles.images}>
                {product.images.map((image, index) => (
                    <div key={index} className={styles.image_container}>
                        <img src={image} alt={`Product ${index + 1}`} className={styles.product_image} />
                    </div>
                ))}
            </div>
            <div className={styles.details_wrapper}>
                <h1 className={styles.name}>{product.name}</h1>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.color}>{product.colors[selectedColor]}</p>
                <ProductTags tags={product.tags} />
                <div className={styles.price_wrapper}>
                    <span className={styles.current_price}>${product.discountedPrice}</span>
                    {product.discountedPrice < product.price && (
                        <span className={styles.crossed_price}>${product.price}</span>
                    )}
                </div>
            </div>
            <div className={styles.controls_wrapper}>
                <div className={styles.variants_container}>
                    <p className={styles.number_of_colors}>
                        {product.colors.length} Colors <span>| {product.colors[selectedColor]}</span>
                    </p>
                    <div className={styles.variants_wrapper}>
                        {product.colors.map((color, index) => (
                            <ProductColors
                                key={index}
                                thumbnail={`https://via.placeholder.com/50x50/${color.toLowerCase()}`}
                                isSelected={selectedColor === index}
                                onClick={() => setSelectedColor(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.sizes_container}>
                    <p className={styles.pick_size}>Select Size</p>
                    <div className={styles.sizes_wrapper}>
                        {product.sizes.map((size, index) => (
                            <ProductSize
                                key={index}
                                value={size}
                                isSelected={selectedSize === size}
                                isOutOfStock={false}
                                onClick={() => setSelectedSize(size)}
                            />
                        ))}
                    </div>
                </div>
                <button className={styles.button}>
                    ADD TO BAG
                </button>
            </div>
        </section>
    );
};

export default ProductPage;