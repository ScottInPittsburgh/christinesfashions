import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import CyanVideo from './assets/videos/Cyan15s.mp4';
import BlackVideo from './assets/videos/Black15s.mp4';
import BronzeVideo from './assets/videos/Bronze15s.mp4';
import ZoomCyanVideo from './assets/videos/CyanZoom15s.mp4';
import ZoomBronzeVideo from './assets/videos/BronzeZoom15s.mp4';
import ZoomBlackVideo from './assets/videos/BlackZoom15s.mp4';
import LongerAudio from "./assets/audios/Default.m4a";
import CyanAudio from "./assets/audios/Cyan.m4a";
import BronzeAudio from "./assets/audios/Bronze.m4a";
import BlackAudio from "./assets/audios/Black.m4a";
import ZoomAudio from "./assets/audios/Zoom.m4a";
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
    const zoomAudioRef = useRef(null);
    const [isLongAudioPlaying, setIsLongAudioPlaying] = useState(true);
    const [selectedColor, setSelectedColor] = useState('Cyan');
    const [selectedSize, setSelectedSize] = useState('');
    const [videoType, setVideoType] = useState('')

    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

    const handleSelectedColor = useCallback((color) => {
        setSelectedColor(color);
        setIsLongAudioPlaying(false)
    }, []);

    const playVideoAsPerSelectedColor = useCallback(() => {
        switch (selectedColor) {
            case 'Cyan':
                switch (videoType) {
                    case 'CyanZoom':
                        return ZoomCyanVideo;
                    default:
                        return CyanVideo;
                }
            case 'Bronze':
                switch (videoType) {
                    case 'BronzeZoom':
                        return ZoomBronzeVideo;
                    default:
                        return BronzeVideo;
                }
            case 'Black':
                switch (videoType) {
                    case 'BlackZoom':
                        return ZoomBlackVideo;
                    default:
                        return BlackVideo;
                }
            default:
                return null;
        }
    }, [selectedColor,videoType]);

    const playZoomVideoAsPerSelectedColor = useCallback(() => {
        zoomAudioRef.current.play();
        cyanAudioRef.current.pause(); 
        bronzeAudioRef.current.pause();
        blackAudioRef.current.pause();
        setVideoType(`${selectedColor}Zoom`)
    }, [selectedColor]);

    useEffect(() => {
        const audioLong = audioLongRef.current;
        audioLong.play();
        return () => {
            audioLong.pause();
        };
    }, []);

    const handlePlayAudioAsPerSelectedColor = useCallback((selectedColor) => {
        console.log({ selectedColor })
        switch (selectedColor) {
            case 'Cyan':
                cyanAudioRef.current.play();
                bronzeAudioRef.current.pause();
                blackAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            case 'Bronze':
                bronzeAudioRef.current.play();
                cyanAudioRef.current.pause();
                blackAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            case 'Black':
                blackAudioRef.current.play();
                bronzeAudioRef.current.pause();
                cyanAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            default:
                break;
        }
    }, [])

    useEffect(() => {
        if (!isLongAudioPlaying) {
            handlePlayAudioAsPerSelectedColor(selectedColor)
        }
    }, [selectedColor, isLongAudioPlaying, handlePlayAudioAsPerSelectedColor]);

    const handleShortAudioEnded = () => {
        audioLongRef.current.play();
        cyanAudioRef.current.currentTime = 0; // Reset short audio to start for next play
        bronzeAudioRef.current.currentTime = 0;
        blackAudioRef.current.currentTime = 0;
    };
    // const handleZoomShortAudioEnded = () => {
    //     audioLongRef.current.pause();
    //     cyanAudioRef.current.currentTime = 0; // Reset short audio to start for next play
    //     bronzeAudioRef.current.currentTime = 0;
    //     blackAudioRef.current.currentTime = 0;
    // };

    const handlePauseAudio = () => {
        audioLongRef.current.pause();
        cyanAudioRef.current.pause();
        bronzeAudioRef.current.pause();
        blackAudioRef.current.pause();
    };


    return (
        <section className={isBigScreen ? styles.container_b : styles.container_s}>
            {selectedColor && (
                <video
                    ref={videoRef}
                    style={{ width: "100%", height: '100vh' }}
                    autoPlay
                    src={playVideoAsPerSelectedColor()}
                    type="video/mp4"
                    className={styles.my_video}
                    loop={true}>
                </video>
            )}

            <div className={styles.details_wrapper}>
                <button onClick={handlePauseAudio}>Pause</button>
                <h1 className={styles.name}>Sample Product</h1>
                <p className={styles.description}>This is a sample product description.</p>
                <div className={styles.zoom_btn_container}>
                    <button className={styles.button} onClick={() => playZoomVideoAsPerSelectedColor()}>
                        Closer View
                    </button>
                </div>
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
            <audio ref={cyanAudioRef} onEnded={handleShortAudioEnded}>
                <source src={CyanAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={bronzeAudioRef} onEnded={handleShortAudioEnded}>
                <source src={BronzeAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={blackAudioRef} onEnded={handleShortAudioEnded}>
                <source src={BlackAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={zoomAudioRef} onEnded={handleShortAudioEnded}>
                <source src={ZoomAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

        </section>
    );
};

export default ProductPage;
