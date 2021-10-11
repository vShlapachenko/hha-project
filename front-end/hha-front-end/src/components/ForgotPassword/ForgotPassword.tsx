import React, { useState, useContext } from "react";
import { Context } from "../../index";
import { Link, useHistory } from "react-router-dom";
import EnterOTP from "./EnterOTP";

const ForgotPassword: React.FC<{}> = () => {
    const [email, setEmail] = useState<string>("");
    const { store } = useContext(Context);
    const [showOTP, setShowOtp] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleSendOTP = () => {

        let emailCheckExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailCheckExpression.test(email)){
            alert("Enter a valid email.");
        }
        else{
            store.setForgotPasswordEmail(email);
            setShowOtp(true);
        }
    }

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
                        type="email"
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
