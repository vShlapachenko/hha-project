import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import EnterOTP from "./EnterOTP";
import styles from "./ForgotPassword.module.css";
import logo_HHA from "../../pages/loginPage/logo.svg";
import {Button} from "@mui/material";

const ForgotPassword: React.FC<{}> = () => {

    const [email, setEmail] = useState<string>("");
    const { store } = useContext(Context);
    const [showOTP, setShowOtp] = useState(false);

    useEffect(()=>{
        if(store.otp.toString().length === 6){
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
        <div>
            <img src={logo_HHA} className={styles.logoHHA} alt="logo" />
            {showOTP ? (
                <EnterOTP disableOtpPage={disableOtpPage} email={email} />
            ) : (
                <div className ={styles.alignment}>
                    <h1 className={styles.header_1}>Enter your email</h1>
                    <div  className={styles.textInput}>
                        <input className={styles.input}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            required={true}
                        />
                    </div>

                    <div className={styles.Button}>
                        <Button onClick={handleSendOTP}
                                sx={{background: '#009CC4'}}
                                variant="contained">
                            Get OTP by email
                        </Button>
                    </div>
                    <div className={styles.link}>
                        <Link to="/">Login Page</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(ForgotPassword);