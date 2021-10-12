import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";

const EnterNewPassword: React.FC<{}> = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { store } = useContext(Context);
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        if (store.forgotPasswordEmail) {
            setUserEmail(store.forgotPasswordEmail);
        }
    }, []);

    const handleSetNewPassword = () => {

        // if (password === confirmPassword) {
        //   store.setNewPasswordService(userEmail, password);
        // } else {
        //   alert("Passwords don't match");
        //   setPassword("");
        //   setConfirmPassword("");
        // }
    };
    return (
        <div className="forgot_password_parent">
            <div className="forget_col">
                <h1>Enter New Password</h1>
                <p>user email - {userEmail || "unknown"}</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="text"
                    placeholder="Enter new password"
                />
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="text"
                    placeholder="Confirm new password"
                />

                <button onClick={handleSetNewPassword}>Set New Password</button>
                <Link to="/">Login Page?</Link>
            </div>
        </div>
    );
};

export default EnterNewPassword;
