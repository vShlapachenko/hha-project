import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import EnterOTP from "./EnterOTP";
import "./ForgotPassword.css";

const ForgotPassword: React.FC<{}> = () => {
    const [email, setEmail] = useState<string>("");
    const { store } = useContext(Context);
    const [showOTP, setShowOtp] = useState(false);

    useEffect(()=>{
        if(store.otp === 403){
            alert("Email does not exist");
            setEmail("");
            setShowOtp(false);
        } else if(store.otp.toString().length === 6){
            setShowOtp(true);
        }
    }, [store.otp])

    const handleSendOTP = () => {

        //reference from https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
        let emailCheckExpression =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

        if (!emailCheckExpression.test(email)) {
            Error("Enter a valid email.");
            alert("Enter a valid email.");
            setEmail("");
        } else {
            console.log("forgot");
            store.setForgotPasswordEmail(email);
            store.forgotPassword(store.forgotPasswordEmail);
            setShowOtp(false);
        }
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
                <div className="allignment-forgot ">
                    <h1>Enter your email</h1>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                        required={true}
                    />

                    <button className="ForgotButton" onClick={handleSendOTP}>
                        Click to recieve OTP by email
                    </button>
                    <Link to="/">Login Page?</Link>
                </div>
            )}
        </div>
    );
};

export default observer(ForgotPassword);
