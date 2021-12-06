import React, {useContext, useState} from "react"
import {Context} from "../../index";
import logo_HHA from "../../pages/loginPage/logo.svg";
import styles from "./changePassword.module.css"
import {useHistory} from "react-router-dom";
import {Button} from "@mui/material";
import { useTranslation, Trans } from "react-i18next";
const ChangePassword: React.FC<{}> = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const { store } = useContext(Context);
    const history = useHistory()

    const redirectPage = () =>{
        history.push({
            pathname: "/homePage",
        });
    }

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            store.changeOldPassword(userEmail, oldPassword, newPassword);
            alert("New Password set")
            history.push({
                pathname: "/userProfile",
            });
        } else {
            alert("Passwords don't match");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    const {t,i18n} = useTranslation();

    return(
        <div>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            <div className={styles.alignment}>
                <h1 className={styles.header}><Trans i18nKey = 'Changepw.title'>Change Password Form</Trans></h1>
                <div className={styles.emailInput}>
                    <input className={styles.input}
                        onChange={(e) => setUserEmail(e.target.value)}
                        value={userEmail}
                        type="email"
                        placeholder={t('Changepw.enter_email')}
                    />
                </div>
                <div className={styles.PasswordInput}>
                    <input className={styles.input}
                           onChange={(e) => setOldPassword(e.target.value)}
                           value={oldPassword}
                           type="password"
                           placeholder={t('Changepw.curr_pw')}
                    />
                </div>
                <div className={styles.PasswordInput}>
                    <input className={styles.input}
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        type="password"
                        placeholder={t('Changepw.new_pw')}
                    />
                </div>
                <div className={styles.PasswordInput}>
                    <input className={styles.input}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        type="password"
                        placeholder={t('Changepw.confirm_pw')}
                    />
                </div>
                <div className={styles.Button}>
                    <Button onClick={handleChangePassword}
                            sx={{background: '#009CC4'}}
                            variant="contained">
                        <Trans i18nKey='Changepw.submit'>Submit</Trans>
                    </Button>
                </div>
                <div className={styles.Button}>
                    <Button onClick={redirectPage}
                            sx={{ background: '#009CC4'}}
                            variant="contained">
                        <Trans i18nKey='Changepw.back'>Back to Profile Page</Trans>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;