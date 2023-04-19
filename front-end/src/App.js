import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './Theme/theme';
import ProductProvider from './context/productsProvider';
import Login from './pages/login';
import Products from './pages/products';
import Checkout from './pages/checkout';
import Register from './pages/register';
import AdminRegister from './pages/adminRegister';
import OrderPage from './pages/orderPage';
import OrderDetails from './pages/orderDetails';
import SellerOrderPage from './pages/sellerOrdersPage';

function App() {
  return (
    <ProductProvider>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/admin/manage" component={ AdminRegister } />
          <Route path="/customer/checkout" component={ Checkout } />
          <Route path="/customer/orders/:id" component={ OrderDetails } />
          <Route path="/customer/orders" component={ OrderPage } />
          <Route path="/seller/orders" component={ SellerOrderPage } />
        </Switch>
      </ThemeProvider>
    </ProductProvider>
  );
}

export default App;
