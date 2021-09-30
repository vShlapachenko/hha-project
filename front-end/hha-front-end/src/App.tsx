import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Input from './components/Input';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      {/* <Route exact path="/input" component = { Input } /> */ } {/* temp path for testing */}
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default App;
