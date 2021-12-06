import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import logo_HHA from "../loginPage/logo.svg"
import registrationStyle from "./Registration.module.css";
import Input  from "../../components/Input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import { Button } from "@mui/material";
import UserService from "../../service/UserService";
import {Context} from "../../index";
import {User} from "../../models/User";
import Navbar from "../../components/Navbar/Navbar";
import { Alert } from "@mui/material";
import {Trans, useTranslation} from 'react-i18next';

const Registration = () => {
    const listItems = [ "English", "Français"];
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [personalStaffNumber, setPersonalStaffNumber] = useState("");
    const [dropdown, setDropdown] = useState("");
    const [email, setEmail] = useState("");
    const {store} = useContext(Context);

    const [accountDropdown, setAccountDropdown] = useState("");
    const accoutTypes = [ "Admin", "Staff", "Head Of Department"];
    const history = useHistory();
//     const hhaUser = {
//         "firstName": firstName,
//         "lastName": lastName,
//         "password": password,
//         "confirmPassword": confirmPassword,
//         "personalStaffNumber": personalStaffNumber,
//         "languageOption": dropdown
//    };
   const languages = [
       {
           code: 'fr',
           name: 'Français',
           country_code: 'fr'
       },
       {
           code: 'en',
           name: 'English',
           country_code: 'gb'
       }
   ]

    const [sumbitSuccessMessage, setSumbitSuccessMessage] = useState(false);
   
    const ROLES = {
        ROLE_ADMIN: "ROLE_ADMIN",
        ROLE_STAFF: "ROLE_STAFF",
        ROLE_HEAD_OF_DEP: "ROLE_HEAD_OF_DEP"
    }
    
    const [users, setUsers] = useState<User[]>([]);


    async function hasRightToRegister() {
        try {
            const response = await UserService.getCurrentUser(store.getUserEmail());
            if (response.data?.roles[0]?.name === ROLES.ROLE_ADMIN || response.data?.roles[0]?.name === ROLES.ROLE_HEAD_OF_DEP) {
                return true;
            } 
            
        } catch (error) {
            console.log(error);
            return false;
        }
        console.log("Only admin or head of department can register a user!")
        alert("Only admin or head of department can register a user!")
        return false;
    }
  
    const {t, i18n} = useTranslation();

    async function getUsers() {
      try {
        const response = await UserService.fetchUsers();
        setUsers(response.data)
      } catch (e) {
  
      }
    }

    async function elegibleToBeSaved() {

        if (email.length > 50) {
            alert("Your email or username is too long!");
            return;
        }

        if (accountDropdown === "") {
            alert("Accout field is required!");
            return;
        }
        

        let userEmailArrays: Array<any>= [];
        try {
            const response = await UserService.fetchUsers();
            console.log(response);
            userEmailArrays = response.data;
            for (let i = 0; i < userEmailArrays.length; i++) {
                if (userEmailArrays[i].email === email) {
                    alert("Email already exists! Please choose a different one!")
                    return false;
                }
            } 
          } catch (e) {
              console.log(e);
              return false;
        }

        if (password !== confirmPassword || password === "") {
            alert("Passwords are not the same or password is empty!");
            return false;
        }

        return true;
    }

    async function saveUser() {

        if (!await hasRightToRegister()) {
            return;
        }

        if (!await elegibleToBeSaved()) {
            return;
        }

        

        let role = "";
        if (accountDropdown === "Admin") {
            role = ROLES.ROLE_ADMIN;
        } else if (accountDropdown === "Staff") {
            role = ROLES.ROLE_STAFF;
        } else {
            role = ROLES.ROLE_HEAD_OF_DEP;
        }

        let roleArray: Array<any> = [];
        let obj = {
            id: "",
            name: role
        };

        roleArray.push(obj);
        const hhaUser = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword,
            "personalStaffNumber": personalStaffNumber,
            "languageOption": dropdown,
            "roles": roleArray
       };

        try {
          const response = await UserService.saveUser(hhaUser.firstName, hhaUser.lastName, hhaUser.password, hhaUser.email, hhaUser.roles);
          console.log(response);
          console.log("register success");
          setTimeout(() => {
            history.push("/homePage");
          },3000);
    
            setSumbitSuccessMessage(true);
        } catch (e) {
            console.log(e);
        }
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

    const setEmailFunc = (event: any) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const setPersonalStaffNumberFunc = (event: any) => {
        event.preventDefault();
        setPersonalStaffNumber(event.target.value);
    }

    const setDropdownFunc = (event: any) => {
        event.preventDefault();
        setDropdown(event.target.value);
        
    }

    const setAccountDropdownFunc = (event: any) => {
        event.preventDefault();
        
        setAccountDropdown(event.target.value);
    }

    const renderAlert =() => {
        return <Alert severity="success">Register user successfully! redirecting...</Alert>;
    }

    const renderNothing =() => {
        return <></>;
    }

    return (
        <div>
             <div>
                <div>
                    <Navbar />
                 </div>
                 {sumbitSuccessMessage?renderAlert():renderNothing()}
             </div>
            <div className={registrationStyle.alignment}>
                <h5 className={registrationStyle.header}><Trans i18nKey = 'Register.title'>Personal Information</Trans></h5>
                <h6 className={registrationStyle.subHeader}><Trans i18nKey = 'Register.body'>Enter your personal information below</Trans></h6>
                <div className= {registrationStyle.name} >
                    <div className={registrationStyle.firstName}><Trans i18nKey = 'Register.first'>First name</Trans></div>
                    <div className={registrationStyle.lastName}><Trans i18nKey = 'Register.last'>Last name</Trans></div>
                </div>
                <div className={registrationStyle.first_last_name}>
                    <div className= {registrationStyle.firstNameInput} >
                        <input className= {registrationStyle.nameInput}
                               value={firstName}
                               type="text"
                               onChange={setFirstNameFunc}
                               placeholder="First name"/>
                    </div>
                    <div className= {registrationStyle.lastNameInput} >
                        <input className= {registrationStyle.nameInput}
                               value={lastName}
                               type="text"
                               onChange={setLastNameFunc}
                               placeholder="Last name"/>
                    </div>
                </div>

                <div className={registrationStyle.assignEmail}>
                   <Trans > Enter your email or a user name of your choice</Trans>
                   <input className={registrationStyle.input}
                          type="email"
                          onChange={setEmailFunc}
                          placeholder="Email"/>
                </div>
                <div className= {registrationStyle.enterPassword} >
                    <Trans i18nKey='Register.enter'>Enter your password</Trans>
                    <input className= {registrationStyle.input}
                           type="password"
                           onChange={setPasswordFunc}
                           placeholder="Password"/>
                </div>
                <div className={registrationStyle.confirmPassword}>
                    <Trans i18nKey='Register.confirm'>Confirm your password</Trans>
                    <input className= {registrationStyle.input}
                           type="password"
                           onChange={setConfirmPasswordFunc}
                           placeholder="Password"/>
                </div>
                <div className={registrationStyle.enterPersonalStaffNumber }>
                    <Trans i18nKey='Register.personal'>Enter your personal staff number (optional)</Trans>
                    <input className= {registrationStyle.input}
                           value={personalStaffNumber}
                           type="text"
                           onChange={setPersonalStaffNumberFunc}
                           placeholder="Personal Staff Number (Optional)"/>
                </div>
                <div className={registrationStyle.choosePreferredLanguage }>
                        <Trans i18nKey='Register.choose'>Choose your preferred language</Trans>
                    <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
                </div>
                <div className={registrationStyle.choosePreferredLanguage}>
                    <h5 ><Trans>Choose type of account, (🚨:Only Admin and Head Of Depart have the right to create new accounts!)</Trans></h5>
                </div>
                <div className= {registrationStyle.choosePreferredLanguage}>
                <Dropdown listItems={accoutTypes} itemName={""} onChangeFunc={setAccountDropdownFunc} initialValue={accountDropdown} />
            </div>
                <div className={registrationStyle.submitButton }>
                    <Button sx={{ background: '#009CC4'}}
                            variant="contained" onClick={saveUser}><Trans i18nKey='Register.submit'>Submit</Trans></Button>
                </div>
            </div>
        </div>
    );
};

export default Registration;



