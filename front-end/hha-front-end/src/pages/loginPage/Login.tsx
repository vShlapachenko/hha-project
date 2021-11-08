import React, {FC, useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import "./Login.css";
import logo_HHA from "./logo.svg"


const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    const history = useHistory();

    const onClickFunc = async () => {
        await store.login(email, password);
        if (store.isAuthorized) {
            history.push('/homePage');
        }
     }

    return (
        <div>
            <img src={logo_HHA} className="logoHHA" alt="logo" />
            <div className= "allignment">
           
            <h1><b>Login</b></h1>
            <div className="plainText">Enter your email and password to access the page </div>
            <br />
            <div className="textInput">
                <div className="plainText"><b>Email</b></div>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className="textInput">
            <br />
            <div className="plainText"><b>Password</b></div>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
            </div>
            <a href="./forgotPassword">Forgot Password</a>
            <br />
            <br />
            <button className= "loginButton" onClick={onClickFunc}>
                Login
            </button>
            <br />
            <br />
            <div className="plainText">If you are having any difficulties connecting to your account, please contact your <b>IT service</b> or <b>HHA representative</b> at <b>support@hha.com</b> </div>
        </div>
        </div>
    );
};

export default observer(Login);



