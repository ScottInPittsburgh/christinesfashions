import React, { useRef, useEffect } from 'react';
import heroImage from './assets/images/content/hero-image.jpg';
import model1image from './assets/images/content/id1image.png';
import model2image from './assets/images/content/id2image.png';
import id1image from './assets/images/content/id1image.jpg';
import id2image from './assets/images/content/id2image.jpg';
import id3image from './assets/images/content/id3image.jpg';
import WelcomeAudio from "./assets/audios/Hello.m4a";
import CollectionCard from './CollectionCard';
import ProductCard from './ProductCard';

const newArrivals = [
    { id: 1, name: 'Summer Tee', description: 'Light and breezy', price: 29.99, imageUrl: model1image, link: '/productpage/1' },
    { id: 2, name: 'Cozy Hoodie', description: 'Perfect for chilly days', price: 49.99, imageUrl: model2image, link: '/productpage/2' },
];

const collections = [
    { id: 1, title: "Dresses", text: "Beautiful and elegant dresses", url: "/collection/Dress", imageUrl: id1image },
    { id: 2, title: "Tops", text: "Stylish and comfortable tops", url: "/collection/Top", imageUrl: id2image },
    { id: 3, title: "Pants", text: "Trendy and versatile pants", url: "/collection/Pants", imageUrl: id3image },
];

const Home = () => {
    const welcomeAudioRef = useRef(null);
    useEffect(() => {
        const hasUserListenedWelcomAudio = localStorage.getItem('isWelcomeAudioListened') === 'true';
    
        if (!hasUserListenedWelcomAudio) {
          welcomeAudioRef.current.play();
        }
    
        return () => {
        //   welcomeAudioRef.current.pause();
          localStorage.setItem('isWelcomeAudioListened', 'true');
        };
      }, []); 
    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1>Christine's Fashions</h1>
            </div>
            <main>
                <section className="new-arrivals">
                    <h2>New Arrivals</h2>
                    <div className="tile-grid">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </section>

                <section className="collections">
                    <h2>Our Collections</h2>
                    <div className="tile-grid">
                        {collections.map(collection => (
                            <CollectionCard key={collection.id} {...collection} />
                        ))}
                    </div>
                </section>


            </main>
            <audio ref={welcomeAudioRef}>
                <source src={WelcomeAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default Home;
