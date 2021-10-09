import React, {useState} from "react";
import  { ReactComponent as Logo }  from "../../assets/Logo.svg";
import registrationStyle from "./Registration.module.css";
import Input  from "../../components/input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import { Button } from "@mui/material";
import axios from "axios";
const Registration = () => {
    const listItems = [ "English", "French"];
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [personalStaffNumber, setPersonalStaffNumber] = useState("");
    const [dropdown, setDropdown] = useState("");

    const hhaUsers = {
         "id": "",
         "email": "",
         "firstName": "",
         "last": "",
         "password": "",
         "activationLink": null,
         "roles": [],
         "department": null,
         "activationStatus": "ACTIVATED",
         "confirmationLink": null
        
    };

    const jwt = "XXXXXX"; // for i get the token from the url?

    const submitInfo = () => {
        axios.post("http://localhost:8080/api/hha-user/saveUser" , { hhaUsers, jwt }).then(() => {
            console.log("first name is " + firstName);
            console.log("last name is " + lastName);
            console.log("password is " + password);
            console.log("confirm password is " + confirmPassword);
            console.log("personal staff number is " + personalStaffNumber);
            console.log("dropdown is " + dropdown);
            //// if successful, pass the above params to the backend for processing
        }).catch(() => {
            console.log("error passing to backend!");
        })
    }
    

    const setFirstNameFunc = (event: any) => {
        event.preventDefault();
        setFirstName(event.target.value);
    }

    const setLastNameFunc = (event: any) => {
        event.preventDefault();
        setLastName(event.target.value);
    }

    const setPasswordFunc = (event: any) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const setConfirmPasswordFunc = (event: any) => {
        event.preventDefault();
        setConfirmPassword(event.target.value);
    }

    const setPersonalStaffNumberFunc = (event: any) => {
        event.preventDefault();
        setPersonalStaffNumber(event.target.value);
    }

    const setDropdownFunc = (event: any) => {
        event.preventDefault();
        setDropdown(event.target.value);
        
    }

    return (
        <div>
             <div>
                <Logo className={registrationStyle.logo} />
                <h5 className={registrationStyle.header}>Personal Information</h5>
                <h6 className={registrationStyle.subHeader}>Enter your personal information below</h6>
            </div>
            <div className= {registrationStyle.name} >
                <div className={registrationStyle.firstName}>First name</div>
                <div className={registrationStyle.lastName}>Last name</div>
            </div>
            <div className= {registrationStyle.nameInput}>
                <div className= {registrationStyle.firstNameInput} >                  
                    <Input userInput={firstName} type="text" label="" onChangeFunc={setFirstNameFunc} />
                </div>
                <div className= {registrationStyle.lastNameInput} >
                    <Input userInput={lastName} type="text" label="" onChangeFunc={setLastNameFunc} />
                </div>
            </div>
        
            <div className={registrationStyle.assignEmail}>
               Email assigned to you
            </div>
            <div >
                <input value="  staff@hha.com" className={registrationStyle.disableInput} disabled />
            </div>

            <div className= {registrationStyle.enterPassword} >
                    Enter your password
                <Input userInput={password} type="password" label="" onChangeFunc={setPasswordFunc} />
            </div>
            <div className={registrationStyle.confirmPassword}>
                    Confirm your password
                <Input userInput={password} type="password" label="" onChangeFunc={setConfirmPasswordFunc} />
            </div> 
            <div className={registrationStyle.enterPersonalStaffNumber }>
                    Enter your personal staff number (optional)
                <Input userInput={personalStaffNumber} type="text" label="" onChangeFunc={setPersonalStaffNumberFunc} />
            </div> 
            <div className={registrationStyle.choosePreferredLanguage }>
                    Choose your preferred language
                <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
            </div>
            <div className={registrationStyle.submitButton }>
                <Button variant="contained" onClick={submitInfo} >Submit</Button>
            </div> 
        </div>
    );
};

export default Registration;