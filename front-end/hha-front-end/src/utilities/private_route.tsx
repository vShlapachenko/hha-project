import React,  {useContext, useEffect, useState}  from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Context} from "../index";
import {User} from "../models/User";
import { observer } from "mobx-react-lite";
import UserService from '../service/UserService';



interface PrivateRouteAttributes {
    path: any;
    Component: any;
}

 function PrivateRoute({path, Component, ...props }: PrivateRouteAttributes) {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);
    const render = () => {
        if (store.isLogin()) {
            console.log("is authorized!");
            if(store.firstTimeUser === true)
            {
                return <Redirect to={{ pathname: '/changePassword' }} />; 
            }
            else{
                return ( <Component {...props} />);
            }
        } else {
            console.log("NOT authorized!");
            return <Redirect to={{ pathname: '/' }} />;
        }
    }

    return <Route {...props} render = {render} />;
}

export default observer(PrivateRoute);