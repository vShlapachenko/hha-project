import React, {useContext, useState} from "react"
import {Context} from "../../index";

const ChangePassword: React.FC<{}> = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const { store } = useContext(Context);

    const handleOldPassword = () => {

    }

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            store.changePassword(newPassword);
        } else {
            alert("Passwords don't match");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return(
        <div>

        </div>
    );
}