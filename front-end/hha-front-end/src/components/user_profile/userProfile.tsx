import React, {useContext, useEffect, useState} from 'react';
import styles from "./user_profile.module.css"
import Button from '@mui/material/Button'
import Navbar from '../Navbar/Navbar'
import TextField from '@mui/material/TextField'
import {useHistory} from "react-router-dom";
import {Context} from "../../index";
import AuthService from "../../service/AuthService";

interface ProfileAttributes {
    firstName: string,
    lastName: string,
    email: string,
    staffNumber: string,
    profileImage?: string,
    department?: string
}
const Profile = ({firstName, lastName, email, staffNumber, profileImage, department}: ProfileAttributes) => {
//
// const Profile: React.FC<{}> = () => {
//     const [firstName, setFirstName] = useState<string>("");
//     const [lastName, setLastName] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [staffNumber, setStaffNumber] = useState<string>("");
    const history = useHistory();
    const { store } = useContext(Context);

    const redirectPage = () =>{
        history.push({
            pathname: "/changePassword",
        });
    }

    email = store.currentUserEmail;
    console.log(store.currentUserEmail);
    store.userProfile(email);

    return (
        <div>
            <Navbar />
             <h1 className={styles.header_1}>Profile</h1>

            <div className={styles.InfoPane}>

                <h3 className={styles.header_2}>Personal Information</h3>

                <div className={styles.first_last_name}>

                    <div className={styles.first_name}>
                        <TextField
                            sx={{width: "258px", height: "55px", background: '#FFFFFF', textSizeAdjust: "80%"}}
                            label="First Name"
                            defaultValue={firstName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className={styles.Last_Name}>
                        <TextField
                            sx={{width: "258px", height: "55px", background: '#FFFFFF'}}
                            label="Last Name"
                            defaultValue={lastName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                </div>

                <div className={styles.email_input}>
                    <TextField
                        sx={{width: "530px", height: "55px", background: '#FFFFFF'}}
                        label="Email"
                        defaultValue={email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>

                <div className={styles.PSN_input}>
                    <TextField
                        sx={{width: "530px", height: "55px", background: '#FFFFFF'}}
                        className="text"
                        label="Staff Number"
                        defaultValue={staffNumber}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </div>

                <div className={styles.change_pass_button}>
                    <Button
                        onClick={redirectPage}
                        sx={{width: "488px", height: "55px", background: '#009CC4'}}
                        variant="contained">Change Password</Button>
                </div>

            </div>

        </div>
    )
};


export default Profile;
