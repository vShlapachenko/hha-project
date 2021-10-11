import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import {Context} from "./index";
import {observer} from "mobx-react-lite"
import Registration from './pages/registrationPage/Registration';


function App() {
  const {store} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (!store.isAuthorized) {
    return (
      <Login/>
    )
  } else 
  return (
    <Switch>
        <Route exact path="/register" component={ Registration } />
    </Switch>
  );
}

export default observer(App);
