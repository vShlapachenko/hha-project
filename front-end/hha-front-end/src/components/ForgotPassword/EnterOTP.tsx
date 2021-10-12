import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import "./ForgotPassword.css";

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

        let otpExpression = /^[0-9]{1,6}$/;
        if (!otpExpression.test(userOtp)) {
            Error("Enter a valid OTP.");
            alert("OTP must be a 6-digit number.");
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
        <div className="forgot_password_parent">
            <div className="forget_col">
                <h1>Enter OTP</h1>
                <input
                    onChange={(e) => setUserOtp(e.target.value)}
                    value={userOtp}
                    type="text"
                    placeholder="OTP"
                    required={true}
                />

                <button className="ForgotButton" onClick={validateOTP}>
                    Validate OTP
                </button>
                <Link to="#" onClick={redirectToForgotPassword}>
                    Enter email again ?
                </Link>
                <Link to="/">Login Page?</Link>
            </div>
        </div>
    );
};

export default observer(EnterOTP);
