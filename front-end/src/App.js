import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
    </Switch>
  );
}
// <Redirect from='/' to='/users/profile/:id' />
// <Route exact path='/register' component={ Redirect } />

export default App;
