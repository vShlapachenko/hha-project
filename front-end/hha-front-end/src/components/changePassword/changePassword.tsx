import React, {useContext, useState} from "react"
import {Context} from "../../index";
import logo_HHA from "../../pages/loginPage/logo.svg";
import styles from "./changePassword.module.css"
import {useHistory} from "react-router-dom";
import {Button} from "@mui/material";

const ChangePassword: React.FC<{}> = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const { store } = useContext(Context);
    const history = useHistory()

    const redirectPage = () =>{
        history.push({
            pathname: "/userProfile",
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

    return(
        <div>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            <div className={styles.alignment}>
            <h1 className={styles.header}>Change Password Form</h1>
            <div className={styles.emailInput}>
                <input className={styles.input}
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    type="email"
                    placeholder="Enter your email"
                />
            </div>
            <div className={styles.PasswordInput}>
                <input className={styles.input}
                       onChange={(e) => setOldPassword(e.target.value)}
                       value={oldPassword}
                       type="password"
                       placeholder="Enter current password"
                />
            </div>
            <div className={styles.PasswordInput}>
                <input className={styles.input}
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type="password"
                    placeholder="Enter new password"
                />
            </div>
            <div className={styles.PasswordInput}>
                <input className={styles.input}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirm new password"
                />
            </div>
            <div className={styles.Button}>
                <Button onClick={handleChangePassword}
                        sx={{background: '#009CC4'}}
                        variant="contained">
                    Submit
                </Button>
            </div>
            <div className={styles.Button}>
                <Button onClick={redirectPage}
                        sx={{ background: '#009CC4'}}
                        variant="contained">
                    Back to Profile Page
                </Button>
            </div>
            </div>
        </div>
    );
}

export default ChangePassword;