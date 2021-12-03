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
import {Trans, useTranslation} from 'react-i18next';

const Registration = () => {
    const listItems = [ "English", "Français"];
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [personalStaffNumber, setPersonalStaffNumber] = useState("");
    const [dropdown, setDropdown] = useState("");
    const {store} = useContext(Context);
    const history = useHistory();
    const hhaUser = {
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "confirmPassword": confirmPassword,
        "personalStaffNumber": personalStaffNumber,
        "languageOption": dropdown
   };
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

    
    const [users, setUsers] = useState<User[]>([]);

    const {t, i18n} = useTranslation();

    async function getUsers() {
      try {
        const response = await UserService.fetchUsers();
        setUsers(response.data)
      } catch (e) {
  
      }
    }

    async function saveUser() {
        try {
          const response = await UserService.saveUser(hhaUser.firstName, hhaUser.lastName, hhaUser.password);
          console.log(response);
          history.push("/");
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
                <img src={logo_HHA} className={registrationStyle.logoHHA} alt="logo" />
             </div>
            <div className={registrationStyle.alignment}>
            <h5 className={registrationStyle.header}>Personal Information</h5>
            <h6 className={registrationStyle.subHeader}>Enter your personal information below</h6>
                 <div>
                    <img src={logo_HHA} className={registrationStyle.logo} alt="logo" />
                 </div>
                <h5 className={registrationStyle.header}><Trans i18nKey = 'Register.title'>Personal Information</Trans></h5>
                <h6 className={registrationStyle.subHeader}><Trans i18nKey = 'Register.body'>Enter your personal information below</Trans></h6>
            </div>
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
               <Trans i18nKey = 'Register.email'>Email assigned to you</Trans>
            </div>
            <div >
                <input value="  staff@hha.com" className={registrationStyle.disableInput} disabled />
            </div>

            <div className= {registrationStyle.enterPassword} >
                    Enter your password
                <input className= {registrationStyle.input}
                       value={password}
                       type="password"
                       onChange={setPasswordFunc}
                       placeholder="Password"/>
                    <Trans i18nKey='Register.enter'>Enter your password</Trans>
                <Input userInput={password} type="password" label="" onChangeFunc={setPasswordFunc} />
            </div>
            <div className={registrationStyle.confirmPassword}>
                    Confirm your password
                <input className= {registrationStyle.input}
                       value={password}
                       type="password"
                       onChange={setConfirmPasswordFunc}
                       placeholder="Password"/>
                    <Trans i18nKey='Register.confirm'>Confirm your password</Trans>
                <Input userInput={password} type="password" label="" onChangeFunc={setConfirmPasswordFunc} />
            </div>
            <div className={registrationStyle.enterPersonalStaffNumber }>
                    Enter your personal staff number (optional)
                <input className= {registrationStyle.input}
                       value={personalStaffNumber}
                       type="text"
                       onChange={setPersonalStaffNumberFunc}
                       placeholder="Personal Staff Number (Optional)"/>
                    <Trans i18nKey='Register.personal'>Enter your personal staff number (optional)</Trans>
                <Input userInput={personalStaffNumber} type="text" label="" onChangeFunc={setPersonalStaffNumberFunc} />
            </div>
            <div className={registrationStyle.choosePreferredLanguage }>
                    <Trans i18nKey='Register.choose'>Choose your preferred language</Trans>
                <Dropdown listItems={listItems} itemName={""} onChangeFunc={setDropdownFunc} initialValue={dropdown} />
            </div>
            <div className={registrationStyle.submitButton }>
                <Button sx={{ background: '#009CC4'}}
                        variant="contained" onClick={saveUser}>Submit</Button>
            </div>
                <Button variant="contained" onClick={saveUser} ><Trans i18nKey='Register.submit'>Submit</Trans></Button>
            </div>
        </div>
    );
};

export default Registration;