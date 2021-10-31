import React, {useContext, useState} from "react"
import {Context} from "../../index";
import logo_HHA from "../../pages/loginPage/logo.svg";
import "./changePassword.css"
import {useHistory} from "react-router-dom";

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
            store.changeOldPassword(userEmail, newPassword);
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
            <img src={logo_HHA} className="logoHHA" alt="logo" />
            <div className="alignment">
                <h1>Change Password</h1>
                <input
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    type="password"
                    placeholder="Enter current password"
                />
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type="password"
                    placeholder="Enter new password"
                />
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirm new password"
                />
                <button className="ForgotButton" onClick={handleChangePassword}>
                    Submit
                </button>

                <button className="ForgotButton" onClick={redirectPage}>
                    Back to Profile Page
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;