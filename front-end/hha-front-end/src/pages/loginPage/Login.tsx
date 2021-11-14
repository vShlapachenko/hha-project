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
            history.push('/homePage');
        }
     }

     const {t, i18n} = useTranslation();
     
     const changeLanguage = (language: string) => {
         i18n.changeLanguage(language);
     };

    return (
        <div className={styles.div}>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            <div className= {styles.allignment}>
           
            <h1><b>{t("Login.login")}</b></h1>
            <div className={styles.plainText}>{t("Login.enter_your_email")} </div>
            <br />
            <div className={styles.textInput}>
            <div className={styles.plainText}><b>{t("Login.username")}</b></div>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder={t('Login.username')}
                />
            </div>
            <div className={styles.textInput}>
            <br />
            <div className={styles.plainText}><b>{t("Login.password")}</b></div>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder={t('Login.password')}
                />
            </div>
            <a href="./forgotPassword">{t("Login.forgot_password")}</a>
            <br />
            <br />
            <Button className= {styles.loginButton}
                    sx={{width: "475px", height: "42px", background: '#009CC4'}}
                    variant="contained"
                    onClick={onClickFunc}>
                {t("Login.login")}
            </Button>
            <br />
            <br />
            <div className={styles.plainText}>
                <Trans i18nKey = 'Login.difficulties'>
                    If you are having any difficulties connecting to your account, please contact your <b>IT service</b> or <b>HHA representative</b> at <b>support@hha.com</b>
                </Trans>
            </div>
        </div>
        </div>
    );
};

export default observer(Login);



