import React, {useContext, useEffect, useState} from 'react';
// import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './pages/loginPage/Login';
import {observer} from "mobx-react-lite"
import Registration from './pages/registrationPage/Registration';
import AddUser from './pages/addUserPage/AddUser';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import EnterNewPassword from "./components/ForgotPassword/EnterNewPassword";
import Forms from "./pages/formsPage/Forms"
import PrivateRoute from './utilities/private_route';
import HomePage from "./pages/homePage/homePage";


function App() {
    return (
        <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/forgotPassword" component={ForgotPassword}/>
            <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
            <Route exact path="/addUser" component={AddUser}/>
            <Route exact path="/register" component={Registration} />
            {/* <PrivateRoute path="/register" Component={Registration} />
            <PrivateRoute path="/addUser" Component={AddUser} /> */}
            {/* <PrivateRoute path="/homePage" Component={HomePage} /> */}
            <Route exact path="/homePage" component={HomePage} />
            <Redirect from="*" to="/" />
        </Switch>
    );
}

export default observer(App);
