import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      {/* temp path for testing*/}
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default App;
