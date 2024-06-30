import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import CyanVideo from './assets/videos/Cyan.mp4';
import BlackVideo from './assets/videos/Black.mp4';
import BronzeVideo from './assets/videos/Bronze.mp4';
import LongerAudio from "./assets/audios/Default.m4a";
import CyanAudio from "./assets/audios/Cyan.m4a";
import BronzeAudio from "./assets/audios/Bronze.m4a";
import BlackAudio from "./assets/audios/Black.m4a";
import styles from './ProductPage.module.scss';

const ProductColors = ({ isSelected, handleSelectedColor }) => (
    <div className={`${styles.color_image_container} ${isSelected ? styles.selected : ''}`}>
        <div className={styles.color_container}>
            <button className={styles.cyan_button} onClick={() => handleSelectedColor("Cyan")}></button>
            <button className={styles.bronze_button} onClick={() => handleSelectedColor("Bronze")}></button>
            <button className={styles.black_button} onClick={() => handleSelectedColor("Black")}></button>
        </div>
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
    const videoRef = useRef();
    const audioLongRef = useRef(null);
    const cyanAudioRef = useRef(null);
    const bronzeAudioRef = useRef(null);
    const blackAudioRef = useRef(null);
    const [selectedColor, setSelectedColor] = useState('Cyan');
    const [shortAudioFinished, setShortAudioFinished] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');

    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

    const handleSelectedColor = useCallback((color) => {
        setSelectedColor(color);
    }, []);

    const playVideoAsPerSelectedColor = useCallback(() => {
        switch (selectedColor) {
            case 'Cyan':
                return CyanVideo;
            case 'Bronze':
                return BronzeVideo;
            case 'Black':
                return BlackVideo;
            default:
                return null;
        }
    }, [selectedColor]);

    const playAudioAsPerSelectedColor = useCallback(() => {
        switch (selectedColor) {
            case 'Cyan':
                cyanAudioRef.current.play();
                bronzeAudioRef.current.pause();
                blackAudioRef.current.pause();
                break;
            case 'Bronze':
                bronzeAudioRef.current.play();
                cyanAudioRef.current.pause();
                blackAudioRef.current.pause();
                break;
            case 'Black':
                blackAudioRef.current.play();
                bronzeAudioRef.current.pause();
                cyanAudioRef.current.pause();
                break;
            default:
                break;
        }
    }, [selectedColor]);

    const handlePauseAudio = useCallback(() => {
        audioLongRef.current.pause();
        cyanAudioRef.current.pause();
    }, []);

    const handleShortAudioEnded = useCallback(() => {
        setShortAudioFinished(true);
        audioLongRef.current.play();
        cyanAudioRef.current.currentTime = 0;
        bronzeAudioRef.current.currentTime = 0;
        blackAudioRef.current.currentTime = 0;
    }, []);

    useEffect(() => {
        const audioLong = audioLongRef.current;
        audioLong.play();
        return () => {
            audioLong.pause();
        };
    }, []);

    useEffect(() => {
        playAudioAsPerSelectedColor();
    }, [selectedColor, playAudioAsPerSelectedColor]);

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
            <button onClick={handlePauseAudio}>Pause</button>
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
                        {product.colors.length} Colors <span> | {product.colors[selectedColor]}</span>
                    </p>
                    <div className={styles.variants_wrapper}>
                        <ProductColors
                            isSelected={false}
                            handleSelectedColor={handleSelectedColor}
                        />
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
            <audio ref={audioLongRef} onEnded={handlePauseAudio}>
                <source src={LongerAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio
                ref={cyanAudioRef}
                onEnded={handleShortAudioEnded}
                style={{ display: shortAudioFinished ? "none" : "block" }}
            >
                <source src={CyanAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio
                ref={bronzeAudioRef}
                onEnded={handleShortAudioEnded}
                style={{ display: shortAudioFinished ? "none" : "block" }}
            >
                <source src={BronzeAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio
                ref={blackAudioRef}
                onEnded={handleShortAudioEnded}
                style={{ display: shortAudioFinished ? "none" : "block" }}
            >
                <source src={BlackAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            {selectedColor && (
                <video
                    ref={videoRef}
                    style={{ width: "80%", height: '100%' }}
                    autoPlay
                    src={playVideoAsPerSelectedColor()}
                    type="video/mp4"
                    className={styles.my_video}
                ></video>
            )}
        </section>
    );
};

export default ProductPage;
