import React,  {useContext, useEffect, useState}  from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Context} from "../index";
import {User} from "../models/User";



interface PrivateRouteAttributes {
    path: any;
    Component: any;
}

export default function PrivateRoute({path, Component, ...props }: PrivateRouteAttributes) {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    

    const render = () => {
        if (store.isAuthorized) {
            console.log("is authorized!");
            
            return ( <Component {...props} />);
        } else {
            console.log("NOT authorized!");
            return <Redirect to={{ pathname: '/' }} />;
        }
    }

   

    return <Route {...props} render = {render} />;
}