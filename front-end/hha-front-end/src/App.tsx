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
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import EnterNewPassword from "./components/ForgotPassword/EnterNewPassword";
import Leaderboard from './components/leaderboard/Leaderboard';
import Typography from '@mui/material/Typography';
import ToDo from './components/TodoList/todo';

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
                <Route exact path="/forgotPassword" component={ForgotPassword}/>
                <Route exact path="/forgotPassword/enterNewPassword" component={EnterNewPassword}/>
                <Redirect from="*" to="/" />
            </Switch>
        )
    } else
        return (
            <>
                <Navbar />
                <h1 className = "textLeaderboard">
                    Leaderboard
                </h1>
                <h2 className = "textBest">
                    Best department of the month
                </h2>

                <Leaderboard departmentName = {"Maternity"} />
                
                <h1 className = "textTODO">
                    What's TODO List
                </h1>
                
                <ToDo firstLine = {"Form for Sep, 2021 is ready to fill in."} 
                secondLine = {"Click on the button to start filling in the form for Sep, 2021 or go to Forms Tab to start the form."}
                thirdLine = {"Start the form"}/>

                <ToDo firstLine = {"Create New Story"}
                secondLine = {"Click on the button to create a new story or go to Case Study Tab"}
                thirdLine = {"Create New Story"}/>
                    
                <div>
                    <button onClick={() => store.logout()}>Logout</button>
                    <div>
                        <button onClick={getUsers}> Get Users</button>
                    </div>
                    {users.map((user) => (
                        <div key={user.email}>
                            email:{user.email ? user.email : "staff@hha.com"}{" "}
                            firstName:
                            {user.firstName} lastName: {user.lastName}{" "}
                        </div>
                    ))}
                </div>
            </>
        );
}

export default observer(App);
