import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './pages/loginPage/Login';
import Navbar from './components/Navbar/Navbar';
import {Context} from "./index";
import {observer} from "mobx-react-lite"
import UserService from "./service/UserService";
import {User} from "./models/User";
import Registration from './pages/registrationPage/Registration';
import AddUser from './pages/addUserPage/AddUser';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import EnterNewPassword from "./components/ForgotPassword/EnterNewPassword";
import PrivateRoute from './utilities/private_route';
import HomePage from "./pages/homePage/homePage";



function App() {
    return (
      <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/forgotPassword" component={ForgotPassword}/>
          <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
          <Route exact path="/homePage" component={HomePage} />
          <Redirect from="*" to="/" />
          <PrivateRoute path="/register" Component={Registration} />
          <PrivateRoute path="/addUser" Component={AddUser} />
      </Switch>

    );
}

export default observer(App);
