import React, { useState, useContext } from "react";
import { Context } from "../../index";
import { Link, useHistory } from "react-router-dom";

interface PropsInterface {
    disableOtpPage: () => void;
    email: string;
}
const EnterOTP: React.FC<PropsInterface> = (props): JSX.Element => {
    const [userOtp, setUserOtp] = useState<string>("");
    const { store } = useContext(Context);
    const history = useHistory();

    const redirectToForgotPassword = () => {
        props.disableOtpPage();
    };

    const validateOTP = () => {
        //navjot
        // if (store.otp?.length === 6 && userOtp.length === 6) {
        //   if (store.otp === userOtp) {
        //     store.setForgotPasswordEmail(props.email);
        //     history.push({
        //       pathname: "/forgotPassword/enterNewPassword",
        //     });
        //   } else {
        //     alert("Incorrect otp, Press Ok to redirect");
        //     redirectToForgotPassword();
        //   }
        // } else {
        //   alert("Error in otp, Press Ok to redirect");
        //   redirectToForgotPassword();
        // }


        //Remove line below when backend is made
        store.setForgotPasswordEmail(props.email);
        history.push({
            pathname: "/forgotPassword/enterNewPassword",
        });
    };

    return (
        <div className="forgot_password_parent">
            <div className="forget_col">
                <h1>Enter OTP Page</h1>
                <input
                    onChange={(e) => setUserOtp(e.target.value)}
                    value={userOtp}
                    type="text"
                    placeholder="OTP"
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
