import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Products from './pages/products';
import Register from './pages/register';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
    </Switch>
  );
}

export default App;
