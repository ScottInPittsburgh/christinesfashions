import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import CyanVideo from './assets/videos/Cyan30s.mp4';
import BlackVideo from './assets/videos/Black30s.mp4';
import BronzeVideo from './assets/videos/Bronze30s.mp4';
import ZoomCyanVideo from './assets/videos/CyanZoom30s.mp4';
import ZoomBronzeVideo from './assets/videos/BronzeZoom30s.mp4';
import ZoomBlackVideo from './assets/videos/BlackZoom30s.mp4';
import LongerAudio from "./assets/audios/longAudio.3gp";

import CyanAudio from "./assets/audios/Cyan.3gp";
import BronzeAudio from "./assets/audios/Bronze.3gp";
import BlackAudio from "./assets/audios/Black.3gp";
import ZoomAudio from "./assets/audios/Zoom.3gp";
import BlackTanSaying from "./assets/audios/CyanSaying.3gp";
import GoldSaying from "./assets/audios/BronzeSaying.3gp";
import MultiSaying from "./assets/audios/BlackSaying.3gp";
import ZoomSaying from "./assets/audios/ZoomSaying.3gp";
import BlackTanColorButton from './assets/images/BlackTanColorButton.png'
import WhiteColorButton from './assets/images/StripeColorButton.png'
import StripeColorButton from './assets/images/WhiteColorButton.png'
import Cart from './assets/images/cart.png'
import Zoom from './assets/images/zoom.png'

import styles from './ProductPage.module.scss';

const ProductColors = ({ handleSelectedColor }) => (
    <div className={styles.color_image_container}>
        <img alt="" className={styles.cyan_button} src={BlackTanColorButton} height={"40px"} width={"40px"} onClick={() => handleSelectedColor("Black/Tan")} />
        <img alt="" className={styles.cyan_button} src={WhiteColorButton} height={"40px"} width={"40px"} onClick={() => handleSelectedColor("Gold Awning Stripe")} />
        <img alt="" className={styles.cyan_button} src={StripeColorButton} height={"40px"} width={"40px"} onClick={() => handleSelectedColor("Multi Petal")} />
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
    const blackTanSayingRef = useRef()
    const goldSayingRef = useRef()
    const multiSayingRef = useRef()
    const zoomSayingRef = useRef()
    const [pricePerItem] = useState(39.99)
    const [isLongAudioPlaying] = useState(true);
    const [isLongAudioEnded, setIsLongAudioEnded] = useState(false);
    const [selectedColor, setSelectedColor] = useState('Black/Tan');
    const [selectedSize, setSelectedSize] = useState('');
    const [videoType, setVideoType] = useState('')
    const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
                const dressProducts = response.data.filter(product =>
                    product.name.startsWith("Button Front Ruffle Hem Dress")
                );
                setProducts(dressProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);


    const handlePlayAudioAsPerSelectedColor = useCallback((selectedColor) => {
        console.log({ selectedColor })
        switch (selectedColor) {
            case 'Black/Tan':
                if (isLongAudioEnded) {
                    cyanAudioRef.current.play();
                } else {
                    blackTanSayingRef.current.play()
                }
                bronzeAudioRef.current.pause();
                blackAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            case 'Gold Awning Stripe':
                if (isLongAudioEnded) {
                    bronzeAudioRef.current.play();
                } else {
                    goldSayingRef.current.play()
                }
                cyanAudioRef.current.pause();
                blackAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            case 'Multi Petal':
                if (isLongAudioEnded) {
                    blackAudioRef.current.play();
                } else {
                    multiSayingRef.current.play()
                }
                
                bronzeAudioRef.current.pause();
                cyanAudioRef.current.pause();
                audioLongRef.current.pause();
                break;
            default:
                break;
        }
    }, [isLongAudioEnded])

    const handleSelectedColor = useCallback((color) => {
        setSelectedColor(color);
        setVideoType('');
        // if (!isLongAudioEnded) {
        //     setIsLongAudioPlaying(false)
        // }
        handlePlayAudioAsPerSelectedColor(color)
    }, [handlePlayAudioAsPerSelectedColor]);

    const playVideoAsPerSelectedColor = useCallback(() => {
        switch (selectedColor) {
            case 'Black/Tan':
                switch (videoType) {
                    case 'Black/TanZoom':
                        return ZoomCyanVideo;
                    default:
                        return CyanVideo;
                }
            case 'Gold Awning Stripe':
                switch (videoType) {
                    case 'Gold Awning StripeZoom':
                        return ZoomBronzeVideo;
                    default:
                        return BronzeVideo;
                }
            case 'Multi Petal':
                switch (videoType) {
                    case 'Multi PetalZoom':
                        return ZoomBlackVideo;
                    default:
                        return BlackVideo;
                }
            default:
                return null;
        }
    }, [selectedColor, videoType]);

    const playZoomAudioAsPerSelectedColor = useCallback(() => {
        if (isLongAudioEnded){
            zoomAudioRef.current.play();
        }else{
            zoomSayingRef.current.play()
        }
       
        cyanAudioRef.current.pause();
        bronzeAudioRef.current.pause();
        blackAudioRef.current.pause();
        audioLongRef.current.pause();
        setVideoType(`${selectedColor}Zoom`)
    }, [selectedColor,isLongAudioEnded]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const audioLong = audioLongRef.current;
        audioLong.play();
        return () => {
            audioLong.pause();
        };
    }, []);

    useEffect(() => {
        if (!isLongAudioPlaying) {
            handlePlayAudioAsPerSelectedColor(selectedColor)
        }
    }, [selectedColor, isLongAudioPlaying, handlePlayAudioAsPerSelectedColor]);

    const handleShortAudioEnded = () => {
        if (isLongAudioEnded) {
            audioLongRef.current.pause();
        }
        else {
            audioLongRef.current.play();
        }
        cyanAudioRef.current.currentTime = 0;
        bronzeAudioRef.current.currentTime = 0;
        blackAudioRef.current.currentTime = 0;
        blackTanSayingRef.current.currentTime = 0;
    };

    // const handlePauseAudio = () => {
    //     audioLongRef.current.pause();
    //     cyanAudioRef.current.pause();
    //     bronzeAudioRef.current.pause();
    //     blackAudioRef.current.pause();
    // };

    const handleAddtoBag = () => {
        if (selectedSize && selectedColor) {
            const productName = `Button Front Ruffle Hem Dress - Color: ${selectedColor} - Size: ${selectedSize}`;
            const selectedProduct = products.find(product => product.name === productName);

            if (selectedProduct) {
                const cartItem = {
                    _id: selectedProduct._id,
                    name: selectedProduct.name,
                    price: pricePerItem,
                    stock: selectedProduct.stock,  // Include stock information
                    quantity: 1,
                    color: selectedColor,
                    size: selectedSize,
                    totalPrice: pricePerItem
                };
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));
                setSelectedItems(cart);
                alert('Product added to cart!');
            } else {
                alert('Product not found. Please try again.');
            }
        } else {
            alert('Please select both color and size');
        }
    };

    const handleLongAudioEnded = () => {
        setIsLongAudioEnded(true)
        audioLongRef.current.currentTime = 0;
    }

    console.log({ isLongAudioPlaying })
    console.log({ isLongAudioEnded })

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
                {/* <button onClick={handlePauseAudio}>Pause</button> */}
                <div className={styles.description_variant_container}>
                    <div className={styles.description_containter}>
                        <h1 className={styles.name}>Button Front Ruffle <br />
                            Hem Dress </h1>
                        <h6 className={styles.amount}>$39.99 </h6>
                    </div>
                    <div className={styles.variants_container}>
                        <div className={styles.variants_wrapper}>
                            <ProductColors handleSelectedColor={handleSelectedColor} />
                        </div>
                    </div>
                </div>
                <div className={styles.zoom_btn_container} onClick={() => playZoomAudioAsPerSelectedColor()}>
                    <img src={Zoom} alt="" height={"70px"} width={"70px"}  />
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
            <audio ref={audioLongRef} onEnded={handleLongAudioEnded}>
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
            <audio ref={blackTanSayingRef} onEnded={handleShortAudioEnded}>
                <source src={BlackTanSaying} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={goldSayingRef} onEnded={handleShortAudioEnded}>
                <source src={GoldSaying} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={multiSayingRef} onEnded={handleShortAudioEnded}>
                <source src={MultiSaying} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={zoomSayingRef} onEnded={handleShortAudioEnded}>
                <source src={ZoomSaying} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </section>
    );
};

export default ProductPage;