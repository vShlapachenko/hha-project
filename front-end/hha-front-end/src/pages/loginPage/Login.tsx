import React, {FC, useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import styles from "./Login.module.css";
import logo_HHA from "./logo.svg"
import {Button} from "@mui/material";


const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    const history = useHistory();

    const onClickFunc = async () => {
        await store.login(email, password);
        if (store.isAuthorized) {
            localStorage.setItem('email', email);
            history.push('/homePage');
        } else {
            alert("You have the wrong credentials!");
        }
    }

    return (
        <div className={styles.div}>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            <div className= {styles.allignment}>
           
            <h1><b>Login</b></h1>
            <div className={styles.plainText}>Enter your email and password to access the page </div>
            <br />
            <div className={styles.textInput}>
            <div className={styles.plainText}><b>Username</b></div>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className={styles.textInput}>
            <br />
            <div className={styles.plainText}><b>Password</b></div>
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
            <Button className= {styles.loginButton}
                    sx={{width: "475px", height: "42px", background: '#009CC4'}}
                    variant="contained"
                    onClick={onClickFunc}>
                Login
            </Button>
            <br />
            <br />
            <div className={styles.plainText}>If you are having any difficulties connecting to your account, please contact your <b>IT service</b> or <b>HHA representative</b> at <b>support@hha.com</b> </div>
        </div>
        </div>
    );
};

export default observer(Login);



