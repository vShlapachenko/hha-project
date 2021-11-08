import React, {useContext, useState} from "react"
import {Context} from "../../index";
import logo_HHA from "../../pages/loginPage/logo.svg";
import "./changePassword.css"
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
            <img src={logo_HHA} className="logoHHA" alt="logo" />
            <h1 className={"header"}>Change Password Form</h1>
            <div className={"emailInput"}>
                <input
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    type="email"
                    placeholder="Enter your email"
                />
            </div>
            <div className={"currPassInput"}>
                <input
                       onChange={(e) => setOldPassword(e.target.value)}
                       value={oldPassword}
                       type="password"
                       placeholder="Enter current password"
                />
            </div>
            <div className={"newPassInput"}>
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type="password"
                    placeholder="Enter new password"
                />
            </div>
            <div className={"confirmPassInput"}>
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirm new password"
                />
            </div>
            <div className={"submit"}>
                <Button onClick={handleChangePassword}
                        sx={{width: "500px", height: "42px", background: '#009CC4'}}
                        variant="contained">
                    Submit
                </Button>
            </div>
            <div className={"profPage"}>
                <Button onClick={redirectPage}
                        sx={{width: "488px", height: "42px", background: '#009CC4'}}
                        variant="contained">
                    Back to Profile Page
                </Button>
            </div>

        </div>
    );
}

export default ChangePassword;