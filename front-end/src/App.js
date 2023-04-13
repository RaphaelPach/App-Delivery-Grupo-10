import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductProvider from './context/productsProvider';
import Login from './pages/login';
import Products from './pages/products';
import Checkout from './pages/checkout';
import Register from './pages/register';
import AdminRegister from './pages/adminRegister';
import CustomerOrderPage from './pages/customerOrderPage';
import CustomerOrderDetails from './pages/customerOrderDetails';
import SellerOrderPage from './pages/sellerOrdersPage';
import SellerOrderDetails from './pages/sellerOrderDetails';

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
        <Route path="/admin/manage" component={ AdminRegister } />
        <Route path="/customer/checkout" component={ Checkout } />
        <Route path="/customer/orders/:id" component={ CustomerOrderDetails } />
        <Route path="/customer/orders" component={ CustomerOrderPage } />
        <Route path="/seller/orders/:id" component={ SellerOrderDetails } />
        <Route path="/seller/orders" component={ SellerOrderPage } />
      </Switch>
    </ProductProvider>
  );
}

export default App;
