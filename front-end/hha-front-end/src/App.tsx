import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './pages/loginPage/Login';
import {observer} from "mobx-react-lite"
import Registration from './pages/registrationPage/Registration';
import AddUser from './pages/addUserPage/AddUser';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import EnterNewPassword from "./components/ForgotPassword/EnterNewPassword";
import PrivateRoute from './utilities/private_route';
import userProfile from "./components/user_profile/userProfile";
import changePassword from "./components/changePassword/changePassword";

function App() {
    return (
      <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/forgotPassword" component={ForgotPassword}/>
          <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
          <Route exact path="/userProfile" component={userProfile}/>
          <Route exact path="/userProfile/changePassword" component={changePassword} />
          <Redirect from="*" to="/" />
          <PrivateRoute path="/register" Component={Registration} />
          <PrivateRoute path="/addUser" Component={AddUser} />
      </Switch>

    );
}

export default observer(App);
