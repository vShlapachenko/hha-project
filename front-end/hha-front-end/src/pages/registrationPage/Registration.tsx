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

const Registration = () => {
    const listItems = [ "English", "French"];
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
  
    async function getUsers() {
      try {
        const response = await UserService.fetchUsers();
        setUsers(response.data)
      } catch (e) {
  
      }
    }

    async function elegibleToBeSaved() {

        const emailRegex = /^\w+@[a-zA-Z_0-9]+\.[a-zA-Z]+$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email.");
            return false;
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

    return (
        <div>
             <div>
                 <div>
                    {/* <img src={logo_HHA} className={registrationStyle.logo} alt="logo" /> */}
                    <Navbar />
                 </div>
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
        
            {/* <div className={registrationStyle.assignEmail}>
               Email assigned to you
            </div> */}
            <div className={registrationStyle.assignEmail}>
               Enter your email
            </div>
            <div className={registrationStyle.emailInput}>
                {/* <input value="  staff@hha.com" className={registrationStyle.disableInput} disabled /> */}
                <Input userInput={email} type="email" label="" onChangeFunc={setEmailFunc} />
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
            <div className={registrationStyle.chooseTypeAccount}>
            <h5 >Choose type of account</h5>
            </div>
            <div className= {registrationStyle.chooseTypeAccountDropdown}>
            <Dropdown listItems={accoutTypes} itemName={""} onChangeFunc={setAccountDropdownFunc} initialValue={accountDropdown} />
            </div>
            <div className={registrationStyle.submitButton }>
                <Button variant="contained" onClick={saveUser} >Submit</Button>
            </div>
        </div>
    );
};

export default Registration;



