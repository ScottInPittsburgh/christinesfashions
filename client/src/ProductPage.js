import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import CyanVideo from './assets/videos/Cyan30s.mp4';
import BlackVideo from './assets/videos/Black30s.mp4';
import BronzeVideo from './assets/videos/Bronze30s.mp4';
import ZoomCyanVideo from './assets/videos/CyanZoom30s.mp4';
import ZoomBronzeVideo from './assets/videos/BronzeZoom30s.mp4';
import ZoomBlackVideo from './assets/videos/BlackZoom30s.mp4';
import LongerAudio from "./assets/audios/Default.m4a";
import CyanAudio from "./assets/audios/Cyan.m4a";
import BronzeAudio from "./assets/audios/Bronze.m4a";
import BlackAudio from "./assets/audios/Black.m4a";
import ZoomAudio from "./assets/audios/Zoom.m4a";
import styles from './ProductPage.module.scss';
import BlackTanColorButton from './assets/images/BlackTanColorButton.png'
import WhiteColorButton from './assets/images/StripeColorButton.png'
import StripeColorButton from './assets/images/WhiteColorButton.png'
import Cart from './assets/images/cart.png'
import Zoom from './assets/images/zoom.png'

const ProductColors = ({ handleSelectedColor }) => (
    <div className={styles.color_image_container}>
        {/*<button className={styles.cyan_button} onClick={() => handleSelectedColor("Cyan")}></button> */}
        <img alt="" className={styles.cyan_button} src={BlackTanColorButton} height={"40px"} width={"40px"} onClick={() => handleSelectedColor("Black/Tan")} />
        <img alt="" className={styles.cyan_button} src={WhiteColorButton} height={"40px"} width={"40px"} onClick={() => handleSelectedColor("Gold Awning Stripe")} />
        <img alt="" className={styles.cyan_button} src={StripeColorButton} height={"40px"} width={"40px"} onClick={() => handleSelectedColor("Multi Petal")} />
        {/* <button className={styles.bronze_button} onClick={() => handleSelectedColor("Bronze")}></button>
        <button className={styles.black_button} onClick={() => handleSelectedColor("Black")}></button> */}
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
    const [pricePerItem] = useState(103.99)
    const [isLongAudioPlaying, setIsLongAudioPlaying] = useState(true);
    const [selectedColor, setSelectedColor] = useState('Black/Tan');
    const [selectedSize, setSelectedSize] = useState('');
    const [videoType, setVideoType] = useState('')
    const [selectedItems, setSelectedItems] = useState([])
    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

    const handleSelectedColor = useCallback((color) => {
        setSelectedColor(color);
        setVideoType('');
        setIsLongAudioPlaying(false)
    }, []);

    const playVideoAsPerSelectedColor = useCallback(() => {
        switch (selectedColor) {
            case 'Black/Tan':
                switch (videoType) {
                    case 'CyanZoom':
                        return ZoomCyanVideo;
                    default:
                        return CyanVideo;
                }
            case 'Gold Awning Stripe':
                switch (videoType) {
                    case 'BronzeZoom':
                        return ZoomBronzeVideo;
                    default:
                        return BronzeVideo;
                }
            case 'Multi Petal':
                switch (videoType) {
                    case 'BlackZoom':
                        return ZoomBlackVideo;
                    default:
                        return BlackVideo;
                }
            default:
                return null;
        }
    }, [selectedColor, videoType]);

    const playZoomAudioAsPerSelectedColor = useCallback(() => {
        zoomAudioRef.current.play();
        cyanAudioRef.current.pause();
        bronzeAudioRef.current.pause();
        blackAudioRef.current.pause();
        audioLongRef.current.pause();
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
            case 'Black/Tan':
                cyanAudioRef.current.play();
                bronzeAudioRef.current.pause();
                blackAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            case 'Gold Awning Stripe':
                bronzeAudioRef.current.play();
                cyanAudioRef.current.pause();
                blackAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            case 'Multi Petal':
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
    const handleAddtoBag = () => {
        if (selectedSize) {

            const existingItemIndex = selectedItems.findIndex(item => item.color === selectedColor && item.size === selectedSize);

            if (existingItemIndex !== -1) {

                const updatedItems = [...selectedItems];
                updatedItems[existingItemIndex].quantity += 1;
                updatedItems[existingItemIndex].totalPrice = pricePerItem * updatedItems[existingItemIndex].quantity;
                setSelectedItems(updatedItems);
                localStorage.setItem('cart', JSON.stringify(updatedItems))
            } else {

                const newItem = {
                    id: Math.random(),
                    color: selectedColor,
                    size: selectedSize,
                    quantity: 1,
                    totalPrice: pricePerItem
                };
                setSelectedItems([...selectedItems, newItem]);
                localStorage.setItem('cart', JSON.stringify([...selectedItems, newItem]))
            }
        }
    };

    console.log(selectedItems)

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
            <div className={styles.cartStyles}>
                <img src={Cart} alt="" height={"50px"} width={"50px"} />
                <p className={styles.items}>{`${selectedItems.length ? selectedItems.reduce((acc, item) => acc + item.quantity, 0) : 0}`}</p>
            </div>
                <button onClick={handlePauseAudio}>Pause</button>
                {/* <button className={styles.button}>{`Items in Cart ${selectedItems.length ? selectedItems.reduce((acc, item) => acc + item.quantity, 0) : 0}`}</button> */}
                <div className={styles.description_variant_container}>
                    <div className={styles.description_containter}>
                        <h1 className={styles.name}>Button Front Ruffle <br />
                            Hem Dress </h1>
                        <h6 className={styles.amount}>$39.99 </h6>
                        {/* <p className={styles.description}>This is a sample product description.</p>
                        <p className={styles.description}>This is a sample product description.</p>
                        <p className={styles.description}>This is a sample product description.</p> */}
                    </div>
                    <div className={styles.variants_container}>
                        <div className={styles.variants_wrapper}>
                            <ProductColors handleSelectedColor={handleSelectedColor} />
                        </div>
                    </div>
                </div>
                <div className={styles.zoom_btn_container}>
                    {/* <button className={styles.button} onClick={() => playZoomAudioAsPerSelectedColor()}> */}
                    <img src={Zoom} alt="" height={"70px"} width={"70px"} onClick={() => playZoomAudioAsPerSelectedColor()} />
                    {/* Closer View */}
                    {/* </button> */}
                </div>
                <div className={styles.controls_wrapper}>
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
                    <div className={styles.cart}>
                        <button className={styles.button} onClick={() => handleAddtoBag()}>
                            ADD TO CART
                        </button>
                    </div>

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
