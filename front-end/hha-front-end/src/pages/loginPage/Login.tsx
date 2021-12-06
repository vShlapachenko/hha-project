import React, {FC, useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"
import styles from "./Login.module.css";
import logo_HHA from "./logo.svg"
import {Button} from "@mui/material";
import {Trans, useTranslation} from 'react-i18next';



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

     const {t, i18n} = useTranslation('translation');

    return (
        <div className={styles.div}>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            <div className= {styles.alignment}>
           
                <h1 className={styles.header_1}><b><Trans i18nKey ="Login.login">Login</Trans></b></h1>
                <div className={styles.plainText}><Trans i18nKey = "Login.enter_your_email">Enter your email and password to access the page</Trans></div>
                <div className={styles.emailInput}>
                <div className={styles.plainText}><b><Trans i18nKey = "Login.username">Username</Trans></b></div>
                    <input className={styles.input}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder={t('Login.username')}
                    />
                </div>
                <div className={styles.passwordInput}>
                <div className={styles.plainText}><b><Trans i18nKey = "Login.password">Password</Trans></b></div>
                    <input className={styles.input}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder={t('Login.password')}
                    />
                </div>
                <div className={styles.loginButton}>
                    <Button
                            sx={{width: "475px", height: "42px", background: '#009CC4'}}
                            variant="contained"
                            onClick={onClickFunc}>
                        <Trans i18nKey = 'Login.login'>
                            Login
                        </Trans>
                    </Button>
                </div>
                <div className={styles.link}>
                    <a href="./forgotPassword"><Trans i18nKey = "Login.forgot_password">Forgot Password?</Trans></a>
                    <br/>
                </div>

                <div className={styles.plainText}>
                    <Trans i18nKey = 'Login.difficulties'>
                    <p>If you are having any difficulties connecting
                    to your account, <br/>please contact your <b>IT service </b>or
                        <b> HHA representative</b> <br/>at <b>support@hha.com</b>
                    </p>
                    </Trans>
                </div>

            </div>
        </div>
    );
};

export default observer(Login);



