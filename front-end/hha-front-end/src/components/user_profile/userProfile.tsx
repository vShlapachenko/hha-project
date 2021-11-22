import React from 'react';
import styles from "./user_profile.module.css"
import Button from '@mui/material/Button'
import Navbar from '../Navbar/Navbar'
import TextField from '@mui/material/TextField'
import {useHistory} from "react-router-dom";
import { useTranslation,Trans } from 'react-i18next';

interface ProfileAttributes {
    firstName: string,
    lastName: string,
    email: string,
    staffNumber: string,
    profileImage?: string,
    department?: string
}

const Profile = ({firstName, lastName, email, staffNumber, profileImage, department}: ProfileAttributes) => {

    const history = useHistory();

    const {t, i18n} = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const redirectPage = () =>{
        history.push({
            pathname: "/changePassword",
        });
    }
    return (
        <div>
            <Navbar />
            {/*<h1 className="header-1">Profile</h1>*/}

                <div className={styles.InfoPane}>

                    <h3 className={styles.header_2}>
                        <Trans i18nKey='Profile.title'>Personal Information</Trans></h3>

                    <div className={styles.first_last_name}>

                        <div className={styles.fisrt_name}>
                            <TextField
                                sx={{width: "308px", height: "55px", background: '#FFFFFF', textSizeAdjust: "80%"}}
                                label={t('Profile.first')}
                                defaultValue={firstName}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>

                        <div className={styles.Last_Name}>
                            <TextField
                                sx={{width: "308px", height: "55px", background: '#FFFFFF'}}
                                label={t('Profile.last')}
                                defaultValue={lastName}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>

                    </div>

                    <div className={styles.email_input}>
                        <TextField
                            sx={{width: "488px", height: "55px", background: '#FFFFFF'}}
                            label="Email"
                            defaultValue={email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className={styles.PSN_input}>
                        <TextField
                            sx={{width: "488px", height: "55px", background: '#FFFFFF'}}
                            className="text"
                            label={t('Profile.staff')}
                            defaultValue={staffNumber}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    </div>
                    <div className = {styles.change_lang}>
                        <Trans i18nKey='Profile.choose'>Preferred language</Trans>
                    </div>
                    <div className = {styles.lang_button}>
                        <Button onClick = {()=>changeLanguage("en")}
                         sx={{width: "200px", height: "55px", background: '#009CC4'}}
                         variant="contained">EN</Button>
                        <Button onClick = {()=>changeLanguage("fr")}
                         sx={{left: "10px",width: "200px", height: "55px", background: '#009CC4'}}
                         variant="contained">FR</Button>
                    </div>
                    <div className={styles.change_pass_button}>
                        <Button onClick={redirectPage}
                                sx={{width: "488px", height: "55px", background: '#009CC4'}}
                                variant="contained"><Trans i18nKey='Profile.change'>Change Password</Trans></Button>
                    </div>

                </div>
        </div>
    )
};


export default Profile;
