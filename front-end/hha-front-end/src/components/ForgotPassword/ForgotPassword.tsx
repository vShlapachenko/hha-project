import React, { useState, useContext } from "react";
import { Context } from "../../index";
import { Link, useHistory } from "react-router-dom";
import EnterOTP from "./EnterOTP";

const ForgotPassword: React.FC<{}> = () => {
    const [email, setEmail] = useState<string>("");
    const { store } = useContext(Context);
    const [showOTP, setShowOtp] = useState(false);
    const history = useHistory();

    const handleSendOTP = () => {
        //navjot
        //to check whteher the email is valid or not.
        //email laike backend ch bhej dena mail te otp bhejna
        //write code for invalid email and return from the function with an alert("invalid email")

        //If email is valid ->
        //store.forgotPassword(email);
        // if (store.otp?.length === 6) {
        //   setShowOtp(true);
        // }

        //remove line below after implementing backend api and uncomment above code
        setShowOtp(true);
    };

    const disableOtpPage = () => {
        setEmail("");
        setShowOtp(false);
    };
    return (
        <div className="forgot_password_parent">
            {showOTP ? (
                <EnterOTP disableOtpPage={disableOtpPage} email={email} />
            ) : (
                <div className="forget_col">
                    <h1>Forgot Password Page</h1>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="Email"
                    />

                    <button onClick={handleSendOTP}>Click to recieve OTP by email</button>
                    <Link to="/">Login Page?</Link>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
