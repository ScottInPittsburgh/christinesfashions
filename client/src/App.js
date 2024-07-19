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
import Header from './Header';
import Footer from './Footer';
import './styles.css';

const Layout = ({ children }) => {
    const location = useLocation();
    const noHeaderFooter = location.pathname === '/productpage/:id';

    return (
        <>
            {!noHeaderFooter && <Header />}
            {children}
            {!noHeaderFooter && <Footer />}
        </>
    );
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Layout>
                                <Cart />
                            </Layout>
                        }
                    />
                    <Route
                        path="/productpage/:id"
                        element={<ProductPage />}
                    />
                    <Route
                        path="/product/:id"
                        element={
                            <Layout>
                                <Product />
                            </Layout>
                        }
                    />
                    <Route
                        path="/collection/:id"
                        element={
                            <Layout>
                                <CollectionPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/collection/products"
                        element={
                            <Layout>
                                <AllProducts />
                            </Layout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Layout>
                                <Login />
                            </Layout>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <Layout>
                                <Admin />
                            </Layout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
