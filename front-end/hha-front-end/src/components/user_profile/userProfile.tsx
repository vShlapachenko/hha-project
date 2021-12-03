import React, {useContext, useEffect, useState} from 'react';
import styles from "./user_profile.module.css"
import Button from '@mui/material/Button'
import Navbar from '../Navbar/Navbar'
import TextField from '@mui/material/TextField'
import {useHistory} from "react-router-dom";
import {Context} from "../../index";
import { useTranslation, Trans } from "react-i18next";

const Profile: React.FC<{}> = () => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [staffNumber, setStaffNumber] = useState<string>("");
    const [firstLoading, setFirstLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();
    const { store } = useContext(Context);

    const {t, i18n} = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const redirectPage = () =>{
        history.push({
            pathname: "/changePassword",
        });
    }

    useEffect(()=>{
        const fetchApi = async ()=>{
            const response = await store.userProfile();
            if (response){
                setFirstLoading(false)
            }
        }
        fetchApi()
    }, [])

    useEffect(()=>{
        if(!firstLoading){
            const emailRes = store.currentUserEmail;
            const FNRes = store.firstName;
            const LNRes = store.lastName;
            setEmail(emailRes);
            setFirstName(FNRes);
            setLastName(LNRes);
        }
    }, [firstLoading])

    useEffect(()=>{
        if (firstName && lastName && email){
            setLoading(false);
        }
    }, [firstName, lastName, email])

    if (loading || firstLoading){
       return <p>Loading</p>
    }

    return (
        <div>
            <Navbar />
            <div className={styles.alignment}>
             <h1 className={styles.header_1}><Trans i18nKey='Profile.profile'>Profile</Trans></h1>

            <div className={styles.InfoPane}>
                <h3 className={styles.header_2}><Trans i18nKey='Profile.title'>Personal Information</Trans></h3>
                <div className={styles.first_last_name}>
                    <div className={styles.first_name}>
                        <TextField
                            sx={{width: "258px", height: "55px", background: '#FFFFFF', textSizeAdjust: "80%"}}
                            label={t('Profile.first')}
                            value={firstName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div className={styles.Last_Name}>
                        <TextField
                            sx={{width: "258px", height: "55px", background: '#FFFFFF'}}
                            label={t('Profile.last')}
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
                    <Button
                        onClick={redirectPage}
                        sx={{background: '#009CC4'}}
                        variant="contained"><Trans i18nKey='Profile.change'>Change Password</Trans></Button>
                </div>

            </div>
            </div>

        </div>
    )
};


export default Profile;
