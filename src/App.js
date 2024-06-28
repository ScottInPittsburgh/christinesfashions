import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Product from './Product';
import Cart from './Cart';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/product" component={Product} />
                <Route path="/cart" component={Cart} />
            </Switch>
        </Router>
    );
}

export default App;
