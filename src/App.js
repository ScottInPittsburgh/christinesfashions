import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import ProductPage from './ProductPage';
import CollectionPage from './CollectionPage';
import Login from './Login';
import './styles.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/collection/:id" element={<CollectionPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
