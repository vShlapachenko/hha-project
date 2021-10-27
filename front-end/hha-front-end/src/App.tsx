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



function App() {
    return (
      <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/forgotPassword" component={ForgotPassword}/>
          <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
          <Redirect from="*" to="/" />
          <PrivateRoute path="/register" Component={Registration} />
          <PrivateRoute path="/addUser" Component={AddUser} />
      </Switch>

    );
    // const {store} = useContext(Context)
    // const [users, setUsers] = useState<User[]>([])
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         store.checkAuth()
    //     }
    // }, [])
    //
    // async function getUsers() {
    //     try {
    //         const response = await UserService.fetchUsers();
    //         setUsers(response.data)
    //     } catch (e) {
    //
    //     }
    // }
    //
    // if (!store.isAuthorized) {
    //     return (
    //         <Switch>
    //             <Route exact path="/" component={ Login } />
    //             <Route exact path="/login" component={ Login } />
    //             <Route exact path="/register" component={Registration} />
    //             <Route exact path="/forgotPassword" component={ForgotPassword}/>
    //             <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
    //             <Redirect from="*" to="/" />
    //         </Switch>
    //     )
    // } else
    //     return (
    //         <>
    //             <Navbar />
    //             <div>
    //                 <h1>You are authorized</h1>
    //                 <button onClick={() => store.logout()}>Logout</button>
    //                 <div>
    //                     <button onClick={getUsers}> Get Users</button>
    //                 </div>
    //                 {users.map((user) => (
    //                     <div key={user.email}>
    //                         email:{user.email ? user.email : "staff@hha.com"}{" "}
    //                         firstName:
    //                         {user.firstName} lastName: {user.lastName}{" "}
    //                     </div>
    //                 ))}
    //             </div>
    //         </>
    //         // <>
    //         //     <Switch>
    //         //         <Route exact path="/forgotPassword" component={ForgotPassword} />
    //         //         <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
    //         //         <Route path="/" exact render={(props) => {
    //         //
    //         //         }}
    //         //         />
    //         //     </Switch>
    //         // </>
    //     );
}

export default observer(App);
