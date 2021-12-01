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
            history.push('/homePage');
        }
    }

    return (
        <div className={styles.div}>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            <div className= {styles.alignment}>
           
                <h1 className={styles.header_1}><b>Login</b></h1>
                <div className={styles.plainText}>Enter your email and password to access the page </div>
                <div className={styles.emailInput}>
                <div className={styles.plainText}><b>Username</b></div>
                    <input className={styles.input}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className={styles.passwordInput}>
                <div className={styles.plainText}><b>Password</b></div>
                    <input className={styles.input}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className={styles.loginButton}>
                    <Button
                            sx={{width: "475px", height: "42px", background: '#009CC4'}}
                            variant="contained"
                            onClick={onClickFunc}>
                        Login
                    </Button>
                </div>
                <div className={styles.link}>
                    <a href="./forgotPassword">Forgot Password</a>
                    <br/>
                </div>

                <div className={styles.plainText}>
                    <p>If you are having any difficulties connecting
                    to your account, <br/>please contact your <b>IT service </b>or
                        <b> HHA representative</b> <br/>at <b>support@hha.com</b>
                    </p>
                </div>
        </div>
        </div>
    );
};

export default observer(Login);



