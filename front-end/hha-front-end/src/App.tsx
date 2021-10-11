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


function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data)
    } catch (e) {

    }
  }

  if (!store.isAuthorized) {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={Registration} />
        <Redirect from="*" to="/" />
      </Switch>
    )
  } else 
  return (
    <><Navbar /><div>
      <h1>You are authorized</h1>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getUsers}> Get Users</button>
      </div>
      {users.map(user => <div key={user.email}>email:{user.email?user.email: "staff@hha.com"} firstName:{user.firstName} lastName: {user.lastName} </div>)}
    </div></>
  );
}

export default observer(App);
