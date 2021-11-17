import React, {useContext, useEffect, useState} from 'react';
import styles from "./user_profile.module.css"
import Button from '@mui/material/Button'
import Navbar from '../Navbar/Navbar'
import TextField from '@mui/material/TextField'
import {useHistory} from "react-router-dom";
import {Context} from "../../index";
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";

// interface ProfileAttributes {
//     firstName: string,
//     lastName: string,
//     email: string,
//     staffNumber: string,
//     profileImage?: string,
//     department?: string
// }
//
// const Profile = ({firstName, lastName, email, staffNumber, profileImage, department}: ProfileAttributes) => {
const Profile: React.FC<{}> = () => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [staffNumber, setStaffNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();
    const { store } = useContext(Context);

    const redirectPage = () =>{
        history.push({
            pathname: "/changePassword",
        });
    }

    useEffect(()=>{
        store.userProfile();
    }, [])

    useEffect(()=>{
        if(store.currentUserEmail && store.firstName && store.lastName){
            const emailRes = store.currentUserEmail;
            const FNRes = store.firstName;
            const LNRes = store.lastName;
            setEmail(emailRes);
            setFirstName(FNRes);
            setLastName(LNRes);
        }
    }, [store.currentUserEmail, store.firstName, store.lastName])

    useEffect(()=>{
        if (firstName && lastName && email){
            setLoading(false);
        }
    }, [firstName, lastName, email])

    if (loading){
        <p>Loading</p>
    }
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
                            value={firstName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className={styles.Last_Name}>
                        <TextField
                            sx={{width: "258px", height: "55px", background: '#FFFFFF'}}
                            label="Last Name"
                            value={lastName}
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
                        value={email}
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
