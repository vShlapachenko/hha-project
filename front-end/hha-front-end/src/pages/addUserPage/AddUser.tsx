import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import { useHistory } from "react-router-dom";
import {observer} from "mobx-react-lite"
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AddUser.module.css";
import Input  from "../../components/Input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import { Button } from "@mui/material";
import { useTranslation, Trans } from 'react-i18next';

const AddUser: FC = () => {
    const {store} = useContext(Context);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [dropdown, setDropdown] = useState("");
    const [password, setPassword] = useState("");
    const listItems = [ "Admin", "Staff", "Head Of Department"];
    
    const {t, i18n} = useTranslation();

    const setEmailFunc = (event: any) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const setConfirmEmailFunc = (event: any) => {
        event.preventDefault();
        setConfirmEmail(event.target.value);
    }

    const setDropdownFunc = (event: any) => {
        event.preventDefault();
        setDropdown(event.target.value);
        
    }

    const setPasswordFunc = (event: any) => {
        event.preventDefault();
        setPassword(event.target.value);
        
    }


    async function createAccount() {
        try {
            console.log("save user hit API");
            
        } catch (e) {
            console.log(e);
            
        }
    }

    async function backToHomePage() {
        try {
          history.push("/");
        } catch (e) {
            console.log(e);
            
        }
      }

    return (
        <div>
            <Navbar />
            <div className={styles.header}>
                <h5 ><Trans i18nKey='Adduser.create'>Create New Account</Trans></h5>
            </div>
            
            <div className={styles.enterEmail}>
                <h5 ><Trans i18nKey='Adduser.enter'>Enter the email of a new user</Trans></h5>
            </div>

            <div className= {styles.emailInput} >                  
                <Input userInput={email} type="text" label="" onChangeFunc={setEmailFunc} />
            </div>

            <div className={styles.confirmEmail}>
                <h5 ><Trans i18nKey='Adduser.confirm'>Confirm email of a new user</Trans></h5>
            </div>
            <div className= {styles.confirmEmailInput} >                  
                <Input userInput={confirmEmail} type="text" label="" onChangeFunc={setConfirmEmailFunc} />
            </div>

            <div className={styles.chooseTypeAccount}>
                <h5 ><Trans i18nKey='Adduser.choose'>Choose type of account</Trans></h5>
            </div>
            <div className= {styles.chooseTypeAccountDropdown}>
                <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
            </div>
            <div className={styles.choosePassword}>
                <h5 ><Trans i18nKey='Adduser.pw'>Choose your password</Trans></h5>
            </div>
            <div className= {styles.password} >                  
                <Input userInput={password} type="text" label="" onChangeFunc={setPasswordFunc} />
            </div>
            <div className={styles.submitButton} >
                <Button variant="contained" onClick={createAccount} ><Trans i18nKey='Adduser.submit'>Submit</Trans></Button>
            </div>

            <div className={styles.backToHomePage} >
                <Button variant="contained" onClick={backToHomePage} ><Trans i18nKey='Adduser.home'>Back to Home Page</Trans></Button>
            </div>
        </div>
    );
};

export default observer(AddUser);