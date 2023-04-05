import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductProvider from './context/productsProvider';
import Login from './pages/login';
import Products from './pages/products';
import Checkout from './pages/checkout';
import Register from './pages/register';

function App() {
  return (
    <ProductProvider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Products } />
        <Route path="/customer/checkout" component={ Checkout } />
      </Switch>
    </ProductProvider>
  );
}

export default App;
