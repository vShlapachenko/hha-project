import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import { useHistory } from "react-router-dom";
import {observer} from "mobx-react-lite"
import Navbar from "../../components/Navbar/Navbar";
import "./AddUser.css";
import Input  from "../../components/Input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import { Button } from "@mui/material";

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
            <div className="header">
                <h5 >Create New Account</h5>
            </div>
            
            <div className="enterEmail">
                <h5 >Enter the email of a new user</h5>
            </div>

            <div className= "emailInput" >                  
                <Input userInput={email} type="text" label="" onChangeFunc={setEmailFunc} />
            </div>

            <div className="confirmEmail">
                <h5 >Confirm email of a new user</h5>
            </div>
            <div className= "confirmEmailInput" >                  
                <Input userInput={confirmEmail} type="text" label="" onChangeFunc={setConfirmEmailFunc} />
            </div>

            <div className="chooseTypeAccount">
                <h5 >Choose type of account</h5>
            </div>
            <div className= "chooseTypeAccountDropdown">
                <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
            </div>
            <div className="choosePassword">
                <h5 >Choose your password</h5>
            </div>
            <div className= "password" >                  
                <Input userInput={password} type="text" label="" onChangeFunc={setPasswordFunc} />
            </div>
            <div className="submitButton" >
                <Button variant="contained" onClick={createAccount} >Submit</Button>
            </div>

            <div className="backToHomePage" >
                <Button variant="contained" onClick={backToHomePage} >Back to Home Page</Button>
            </div>
        </div>
    );
};

export default observer(AddUser);