import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import ProductPage from './ProductPage';
import Product from './Product';
import CollectionPage from './CollectionPage';
import Login from './Login';
import Admin from './Admin';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/productpage/:id" element={<ProductPage />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/collection/:id" element={<CollectionPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;