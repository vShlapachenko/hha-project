import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import {Button} from "@mui/material";

interface PropsInterface {
    disableOtpPage: () => void;
    email: string;
}
const EnterOTP: React.FC<PropsInterface> = (props): JSX.Element => {
    let [userOtp, setUserOtp] = useState<string>("");
    const { store } = useContext(Context);
    const history = useHistory();
    const [storeOtp, setStoreOtp] = useState<string>("");

    const redirectToForgotPassword = () => {
        props.disableOtpPage();
    };

    useEffect(() => {
        const stringOtpResponse = store.otp.toString();
        setStoreOtp(stringOtpResponse);
    }, [store.otp]);

    const validateOTP = () => {
        console.log("real otp", storeOtp);
        console.log("userotp ", userOtp);

        //reference from https://stackoverflow.com/questions/4758414/6-digits-regular-expression
        let otpExpression = /^[0-9]{1,6}$/;
        if (!otpExpression.test(userOtp)) {
            Error("Enter a valid OTP.");
            alert("OTP must be a 6-digit number.");
            setUserOtp("");
        } else {
            if (storeOtp?.length === 6 && userOtp.length === 6) {
                if (storeOtp === userOtp) {
                    store.setForgotPasswordEmail(props.email);
                    history.push({
                        pathname: "/forgotPassword/enterNewPassword",
                    });
                } else {
                    alert("Incorrect otp, Press Ok to enter again");
                    setUserOtp("");
                }
            } else {
                alert("Error in otp,Press Ok to enter again");
                setUserOtp("");
            }
        }
    };

    if (storeOtp.length < 2) {
        return <p>Loading</p>;
    }
    return (
        <div>
            <div className={styles.alignment}>
                <h1>Enter OTP</h1>
                <input
                    onChange={(e) => setUserOtp(e.target.value)}
                    value={userOtp}
                    type="text"
                    placeholder="OTP"
                    required={true}
                />

                <Button className={styles.ForgotButton} onClick={validateOTP}
                        sx={{width: "488px", height: "42px", background: '#009CC4'}}
                        variant="contained">
                    Validate OTP
                </Button>
                <Link to="#" onClick={redirectToForgotPassword}>
                    Enter email again?
                </Link>
                <Link to="/">Login Page?</Link>
            </div>
        </div>
    );
};

export default observer(EnterOTP);
