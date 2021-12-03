import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import {Link, useHistory} from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import logo_HHA from "../../pages/loginPage/logo.svg";
import {Button} from "@mui/material";
import {Trans, useTranslation} from 'react-i18next';

const EnterNewPassword: React.FC<{}> = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { store } = useContext(Context);
    const history = useHistory();
    const [userEmail, setUserEmail] = useState<string>("");

    const {t, i18n} = useTranslation();

    useEffect(() => {
        if (store.forgotPasswordEmail) {
            setUserEmail(store.forgotPasswordEmail);
        }
    }, []);

    const handleSetNewPassword = () => {
        if (password === confirmPassword) {
            store.setNewPassword(userEmail, password);
            alert("New Password set")
            history.push({
                pathname: "/",
            });
        } else {
            alert("Passwords don't match");
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            <div className={styles.alignment}>
                <h1 className={styles.header_1}>Enter New Password</h1>
                <p className={styles.header_2}>user email - {userEmail || "unknown"}</p>
                <div className={styles.textInput}>
                    <input className={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Enter new password"
                    />
                </div>

                <div className={styles.confirmInput}>
                    <input className={styles.input}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm new password"
                    />
                </div>
                <h1>
                    <Trans i18nKey = 'EnterPassword.title'>Enter New Password</Trans>
                </h1>
                <p>{t('EnterPassword.email')} - {userEmail || "unknown"}</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter new password"
                />
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirm new password"
                />

                <div className={styles.Button}>
                    <Button className={styles.ForgotButton} onClick={handleSetNewPassword}
                            sx={{background: '#009CC4'}}
                            variant="contained">
                        Submit
                    </Button>
                </div>

                <div className={styles.link}>
                    <Link to="/">Login Page?</Link>
                </div>
                <Button className={styles.ForgotButton} onClick={handleSetNewPassword}
                        sx={{width: "488px", height: "42px", background: '#009CC4'}}
                        variant="contained">
                    Submit
                </Button>
                <Link to="/"><Trans i18nKey = 'EnterPassword.link'>Login Page?</Trans></Link>
            </div>
        </div>
    );
};

export default EnterNewPassword