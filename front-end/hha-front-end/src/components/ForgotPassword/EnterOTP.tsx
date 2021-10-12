import React, { useState, useContext } from "react";
import { Context } from "../../index";
import { Link, useHistory } from "react-router-dom";

interface PropsInterface {
    disableOtpPage: () => void;
    email: string;
}
const EnterOTP: React.FC<PropsInterface> = (props): JSX.Element => {
    let [userOtp, setUserOtp] = useState<string>("");
    const { store } = useContext(Context);
    const history = useHistory();

    const redirectToForgotPassword = () => {
        props.disableOtpPage();
    };

    const validateOTP = () => {

        let otpExpression = /^[0-9]{1,6}$/
        if (!otpExpression.test(userOtp)){
            Error("Enter a valid OTP.");
            alert("OTP must be a 6-digit number.")
        }

        if (store.otp?.length === 6 && userOtp.length === 6) {
          if (store.otp === userOtp) {
            store.setForgotPasswordEmail(props.email);
            history.push({
              pathname: "/forgotPassword/enterNewPassword",
            });
          } else {
            alert("Incorrect otp, Press Ok to redirect");
            redirectToForgotPassword();
          }
        } else {
          alert("Error in otp, Press Ok to redirect");
          setUserOtp("");
          // redirectToForgotPassword();
        }
    };

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

                <button onClick={validateOTP}>Validate OTP</button>
                <Link to="#" onClick={redirectToForgotPassword}>
                    Enter email again ?
                </Link>
                <Link to="/">Login Page?</Link>
            </div>
        </div>
    );
};

export default EnterOTP;
