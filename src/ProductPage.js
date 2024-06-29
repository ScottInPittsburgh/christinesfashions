import React, { useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import CyanVideo from './assets/videos/Cyan.mp4';
import BlackVideo from './assets/videos/Black.mp4';
import BronzeVideo from './assets/videos/Bronze.mp4';
import LongerAudio from "./assets/audios/Default.m4a";
import CyanAudio from "./assets/audios/Cyan.m4a";
import styles from './ProductPage.module.scss';

const ProductColors = ({ thumbnail, isSelected, onClick }) => (
    <div className={`${styles.color_image_container} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
        <img src={thumbnail} alt="Product color" className={styles.color_thumbnail} />
    </div>
);

const ProductSize = ({ value, isSelected, isOutOfStock, onClick }) => (
    <div className={`${styles.size} ${isSelected ? styles.fill : ''} ${isOutOfStock ? styles.no_stock : ''}`} onClick={onClick}>
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
    const videoRef = useRef();
    const audioLongRef = useRef(null);
    const cyanAudioRef = useRef(null);
    const bronzeAudioRef = useRef(null);
    const blackAudioRef = useRef(null);
    const [selectedColor, setSelectedColor] = useState('Cyan');
    const [shortAudioFinished, setShortAudioFinished] = useState(false);
    const [playingLongAudio, setPlayingLongAudio] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');

    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

    const handleSelectedColor = (color) => {
        setSelectedColor(color);
        if (color === 'Cyan') {
            handlePlayShortAudio();
        } else {
            handlePlayLongAudio();
        }
    };

    const playVideoAsPerSelectedColor = () => {
        switch (selectedColor) {
            case 'Cyan':
                return CyanVideo;
            case 'Bronze':
                return BronzeVideo;
            case 'Black':
                return BlackVideo;
            default:
                break;
        }
    };

    const handlePauseAudio = () => {
        audioLongRef.current.pause();
        cyanAudioRef.current.pause();
    };

    const handlePlayLongAudio = () => {
        audioLongRef.current.play();
        setPlayingLongAudio(true);
        setShortAudioFinished(false);
    };

    const handlePlayShortAudio = () => {
        cyanAudioRef.current.play();
        audioLongRef.current.pause();
        setPlayingLongAudio(false);
    };

    const handleShortAudioEnded = () => {
        setShortAudioFinished(true);
        audioLongRef.current.play();
        cyanAudioRef.current.currentTime = 0;
    };

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
        <>
            <section className={isBigScreen ? styles.container_b : styles.container_s}>
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
                                    isSelected={selectedColor === color}
                                    onClick={() => handleSelectedColor(color)}
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

                {selectedColor && <video ref={videoRef} style={{ width: "100%", height: '100%' }}
                                         autoPlay="autoplay" src={playVideoAsPerSelectedColor()}
                                         type="video/mp4" className="myVideo" loop={true}>
                </video>}

                <audio ref={audioLongRef} src={LongerAudio} loop />
                <audio ref={cyanAudioRef} src={CyanAudio} onEnded={handleShortAudioEnded} />
            </section>
        </>
    );
};

export default ProductPage;
