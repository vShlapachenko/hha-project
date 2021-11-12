import React from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';
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
import AddCaseStudy from './components/add_case_studies/AddCaseStudy';
import CaseStudy from './pages/caseStudyPage/CaseStudy';
import HomePage from "./pages/homePage/homePage";
import userProfile from "./components/user_profile/userProfile";
import ChangePassword from "./components/changePassword/changePassword";
import Forms from './pages/formsPage/Forms';




function App() {
    return (
        <Switch>
            <Route exact path="/forms" component={Forms} />
            <Route exact path="/" component={ Login } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/forgotPassword" component={ForgotPassword}/>
            <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
            <Route exact path="/addUser" component={AddUser}/>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/userProfile" component={userProfile} />
            <Route exact path="/changePassword" component={ChangePassword} />
            <Route exact path="/caseStudy" component={CaseStudy} />
            {/* <PrivateRoute path="/register" Component={Registration} />
            <PrivateRoute path="/addUser" Component={AddUser} /> */}
            {/* <PrivateRoute path="/homePage" Component={HomePage} /> */}
            <Route exact path="/homePage" component={HomePage} />
            <Redirect from="*" to="/" />
        </Switch>
    );
}

export default observer(App);
