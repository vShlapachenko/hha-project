import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import "./Login.css";
import logo_HHA from "./logo.svg"
import {Button} from "@mui/material";


const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
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
            <Button className= "loginButton"
                    sx={{width: "475px", height: "42px", background: '#009CC4'}}
                    variant="contained"
                    onClick={() => store.login(email, password)}>
                Login
            </Button>
            <br />
            <br />
            <div className="plainText">If you are having any difficulties connecting to your account, please contact your <b>IT service</b> or <b>HHA representative</b> at <b>support@hha.com</b> </div>
        </div>
        </div>
    );
};

export default observer(Login);



