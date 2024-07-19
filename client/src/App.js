import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import ProductPage from './ProductPage'; // For hardcoded new arrivals
import Product from './Product'; // For dynamically fetched products
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
                    <Route path="/productpage/:id" element={<ProductPage />} /> {/* Route for hardcoded new arrivals */}
                    <Route path="/product/:id" element={<Product />} /> {/* Route for dynamically fetched products */}
                    <Route path="/collection/:id" element={<CollectionPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
