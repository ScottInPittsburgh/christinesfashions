import React, { useRef,useState, useEffect } from 'react';
import heroImage from './assets/images/content/hero-image.jpg';
import model1image from './assets/images/content/id1image.png';
import model2image from './assets/images/content/id2image.png';
import dressesimage from './assets/images/content/dressesimage.png';
import topsimage from './assets/images/content/topsimage.png';
import pantsimage from './assets/images/content/pantsimage.png';
// import id1image from './assets/images/content/id1image.jpg';
// import id2image from './assets/images/content/id2image.jpg';
// import id3image from './assets/images/content/id3image.jpg';
import WelcomeAudio from "./assets/audios/Hello.3gp";
import CollectionCard from './CollectionCard';
import ProductCard from './ProductCard';
import Modal from './Modal'

const newArrivals = [
    { id: 1, name: 'Button Front Ruffle Hem Dress', description: 'Light and breezy', price: 39.99, imageUrl: model1image, link: '/productpage/1' },
    { id: 2, name: 'Short Sleeve Lapel Blouse', description: 'Cool and casual', price: 32.99, imageUrl: model2image, link: '/productpage/2' },
];

const collections = [
    { id: 1, title: "Dresses", text: "Beautiful and elegant dresses", url: "/collection/Dress", imageUrl: dressesimage },
    { id: 2, title: "Tops", text: "Stylish and comfortable tops", url: "/collection/Top", imageUrl: topsimage },
    { id: 3, title: "Pants", text: "Trendy and versatile pants", url: "/collection/Pants", imageUrl: pantsimage },
];

const Home = () => {
    const hasUserListenedWelcomAudio = localStorage.getItem('isWelcomeAudioListened') === 'true';
    const welcomeAudioRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(!hasUserListenedWelcomAudio);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    useEffect(() => {
        return () => {
        //   welcomeAudioRef.current.pause();
          localStorage.setItem('isWelcomeAudioListened', 'true');
        };
      }, []); 

      useEffect(() => {
       
        if (isAudioPlaying && welcomeAudioRef.current && !hasUserListenedWelcomAudio) {
          welcomeAudioRef.current.play().catch(error => {
            console.error('Playback error:', error);
          });
        }
        
      }, [isAudioPlaying,hasUserListenedWelcomAudio]);
    
      const handleModalClose = () => {
        setIsModalOpen(false);
        setIsAudioPlaying(true); // Start playing audio after closing the modal
      };
    return (
        <div>
             <Modal isOpen={isModalOpen} onClose={handleModalClose} />
            <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1>Christine's Fashions</h1>
            </div>
            <main>
                <section className="new-arrivals">
                    <h2>New Arrivals</h2>
                    <div className="custom-tile-grid">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id}  customStyles={true}  {...product} />
                        ))}
                    </div>
                </section>

                <section className="collections">
                    <h2>Our Collections</h2>
                    <div className="tile-grid">
                        {collections.map(collection => (
                            <CollectionCard key={collection.id}{...collection} />
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
