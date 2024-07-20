import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import ProductPage from './ProductPage';
import Product from './Product';
import CollectionPage from './CollectionPage';
import Login from './Login';
import Admin from './Admin';
import AllProducts from './AllProducts';
import OrderHistory from './OrderHistory';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from './AuthContext';
import './styles.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/productpage/:id" element={<ProductPage />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/collection/:type" element={<CollectionPage />} />
                        <Route path="/collection/products" element={<AllProducts />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/orders" element={<OrderHistory />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;