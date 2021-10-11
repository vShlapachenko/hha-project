import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import EnterNewPassword from "./components/ForgotPassword/EnterNewPassword";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import UserService from "./service/UserService";
import { User } from "./models/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {}
  }

  if (!store.isAuthorized) {
    return (
        <Router>
          <Switch>
            <Route exact path="/forgotPassword/enterNewPassword">
              <EnterNewPassword />
            </Route>
            <Route exact path="/forgotPassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
    );
  }
  return (
      <div>
        <h1>You are authorized</h1>
        <button onClick={() => store.logout()}>Logout</button>
        <div>
          <button onClick={getUsers}> Get Users</button>
        </div>
        {users.map((user) => (
            <div key={user.email}>THIS IS USER EMAIL {user.email}</div>
        ))}
      </div>
  );
}

export default observer(App);
