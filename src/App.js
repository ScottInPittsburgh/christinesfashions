import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Product from './Product';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/product" component={Product} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
