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

const ProductColors = ({ handleSelectedColor }) => (
    <div className={styles.color_image_container}>
        <button className={styles.cyan_button} onClick={() => handleSelectedColor("Cyan")}></button>
        <button className={styles.bronze_button} onClick={() => handleSelectedColor("Bronze")}></button>
        <button className={styles.black_button} onClick={() => handleSelectedColor("Black")}></button>
    </div>
);

const ProductSize = ({ value, isSelected, isOutOfStock, onClick }) => (
    <div className={`${styles.size} ${isSelected ? styles.fill : ''} ${isOutOfStock ? styles.no_stock : ''}`} onClick={onClick}>
        {value.toUpperCase()}
    </div>
);

const ProductPage = () => {
    const videoRef = useRef();
    const audioLongRef = useRef(null);
    const cyanAudioRef = useRef(null);
    const bronzeAudioRef = useRef(null);
    const blackAudioRef = useRef(null);
    const [selectedColor, setSelectedColor] = useState('Black');
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

    useEffect(() => {
        const audioLong = audioLongRef.current;
        audioLong.play();
        return () => {
            audioLong.pause();
        };
    }, []);

    useEffect(() => {
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

    return (
        <section className={isBigScreen ? styles.container_b : styles.container_s}>
            <button onClick={() => audioLongRef.current.pause()}>Pause</button>
            <div className={styles.details_wrapper}>
                <h1 className={styles.name}>Sample Product</h1>
                <p className={styles.description}>This is a sample product description.</p>
                <div className={styles.controls_wrapper}>
                    <div className={styles.variants_container}>
                        <div className={styles.variants_wrapper}>
                            <ProductColors handleSelectedColor={handleSelectedColor} />
                        </div>
                    </div>
                    <div className={styles.sizes_container}>
                        <p className={styles.pick_size}>Select Size</p>
                        <div className={styles.sizes_wrapper}>
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <ProductSize
                                    key={size}
                                    value={size}
                                    isSelected={selectedSize === size}
                                    isOutOfStock={false}
                                    onClick={() => setSelectedSize(size)}
                                />
                            ))}
                        </div>
                    </div>
                    <button className={styles.button}>ADD TO BAG</button>
                </div>
            </div>
            <audio ref={audioLongRef}>
                <source src={LongerAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={cyanAudioRef}>
                <source src={CyanAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={bronzeAudioRef}>
                <source src={BronzeAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={blackAudioRef}>
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
