import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

import ForgotPasswordService from "../service/ForgotPasswordService";
import NewPasswordService from "../service/NewPasswordService";
import ChangePasswordService from "../service/ChangePasswordService";
import UserService from "../service/UserService";
import { Analytics, FamilyRestroomTwoTone } from "@mui/icons-material";

export default class Store {
    isAuthorized = false;
    otp = 0;
    forgotPasswordEmail = "";
    currentUserEmail = "";
    firstName = "";
    lastName = "";
    firstTimeUser = false;
    emailList: Array<String> = [];

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuthorized(bool: boolean){
        this.isAuthorized = bool;
    }

    setOtp(value: number) {
        this.otp = value;
    }

    setForgotPasswordEmail(value: string) {
        this.forgotPasswordEmail = value;
    }


    setCurrentUserEmail(value: string) {
        this.currentUserEmail = value;
    }

    setFirstName(value: string) {
        this.firstName = value;
    }

    setLastName(value: string) {
        this.lastName = value;
    }

    setFirstTimeUser(value: boolean){
        this.firstTimeUser = value;
    }

    addDataToList(value: String){
        this.emailList.push(value);
    }

    checkCurrentEmailinList(value: String){
         var n = 1000;
         for( var i = 0; i < n; i++){
             if(value !== this.emailList[i]){
                 return false;
             }
             else{
                 return true;
             }
         }
        
    }

    isLogin = () => {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    }

    async login (email: string, password: string){
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuthorized(true)
        } catch(e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setIsAuthorized(false)
        } catch(e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuthorized(true)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async forgotPassword(email: string) {
        try {
            console.log("email", email);

            const request = await ForgotPasswordService.ForgotPassword(email);

            if (request) {
                this.setOtp(request.data);
            } else {
                console.log("Error in store.forgotPassword");
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async setNewPassword(email: string, password: string) {
        try {
            await NewPasswordService.NewPassword(email, password);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async changeOldPassword(email: string, oldPassword: string, newPassword: string) {
        try{
            await ChangePasswordService.ChangePassword(email, oldPassword, newPassword);
        } catch(e:any){
            console.log(e.response?.data?.message);
        }
    }

    async userProfile(){
        try {
            const response = await UserService.getUser();
            if (response.data){
                this.setCurrentUserEmail(response.data.email);
                this.setFirstName(response.data.firstName);
                this.setLastName(response.data.lastName);
                this.setFirstTimeUser(response.data.firstTimeUser);
                return true;
            }
            return false;
        } catch (e: any){
            console.log(e.response?.data?.message);
        }
    }

}