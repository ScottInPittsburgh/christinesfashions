import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Product from './Product';
import ProductPage from './ProductPage';
import CollectionPage from './CollectionPage';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/collection/:id" element={<CollectionPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;