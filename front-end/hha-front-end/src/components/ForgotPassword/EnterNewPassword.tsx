import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import {Link, useHistory} from "react-router-dom";
import "./ForgotPassword.css";

const EnterNewPassword: React.FC<{}> = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { store } = useContext(Context);
    const history = useHistory();
    const [userEmail, setUserEmail] = useState<string>("");

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
        <div className="forgot_password_parent">
            <div className="allignment-forgot">
                <h1>Enter New Password</h1>
                <p>user email - {userEmail || "unknown"}</p>
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

                <button className="ForgotButton" onClick={handleSetNewPassword}>
                    Set New Password
                </button>
                <Link to="/">Login Page?</Link>
            </div>
        </div>
    );
};

export default EnterNewPassword;
