import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import { useHistory } from "react-router-dom";
import {observer} from "mobx-react-lite"
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AddUser.module.css";
import Input  from "../../components/Input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import { Button } from "@mui/material";
import registrationStyle from "../registrationPage/Registration.module.css";

const AddUser: FC = () => {
    const {store} = useContext(Context);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [dropdown, setDropdown] = useState("");
    const [password, setPassword] = useState("");
    const listItems = [ "Admin", "Staff", "Head Of Department"];

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
            <div className={styles.alignment}>
                <div className={styles.header}>
                    <h5 >Create New Account</h5>
                </div>
                <div className={styles.enterEmail}>
                    <h5 >Enter the email of a new user</h5>
                </div>

                <div className= {styles.emailInput} >
                    <input className={styles.input}
                           value={email} type="text" placeholder="Email" onChange={setEmailFunc} />
                </div>

                <div className={styles.confirmEmail}>
                    <h5 >Confirm email of a new user</h5>
                </div>
                <div className= {styles.confirmEmailInput} >
                    <input className={styles.input}
                           value={confirmEmail} type="text" placeholder="Confirm Email" onChange={setConfirmEmailFunc} />
                </div>

                <div className={styles.chooseTypeAccount}>
                    <h5 >Choose type of account</h5>
                </div>
                <div className= {styles.chooseTypeAccountDropdown}>
                    <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
                </div>
                <div className={styles.choosePassword}>
                    <h5 >Choose your password</h5>
                </div>
                <div className= {styles.password} >
                    <input className={styles.input}
                           value={password} type="text" placeholder="Password" onChange={setPasswordFunc} />
                </div>
                <div className={styles.Button} >
                    <Button sx={{ background: '#009CC4'}} variant="contained" onClick={createAccount} >Submit</Button>
                </div>

                <div className={styles.Button} >
                    <Button sx={{ background: '#009CC4'}} variant="contained" onClick={backToHomePage} >Back to Home Page</Button>
                </div>
            </div>
        </div>
    );
};

export default observer(AddUser);