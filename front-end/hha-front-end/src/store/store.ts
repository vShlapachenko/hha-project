import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";


//navjot
//import { ForgotPasswordService,setNewPasswordService  } from "../service/AuthService";

export default class Store {
    isAuthorized = false;
    otp = "";
    forgotPasswordEmail = "";

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuthorized(bool: boolean){
        this.isAuthorized = bool;
    }

    setOtp(value: string) {
        this.otp = value;
    }
    setForgotPasswordEmail(value: string) {
        this.forgotPasswordEmail = value;
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
    // async forgotPassword(email: string) {
    //   //navjot
    //   try {
    //     const response = await ForgotPasswordService.ForgotPassword(email);
    //     console.log(response);

    //     if (response) {
    //       // this.setOtp(response.otp);
    //     } else {
    //       console.log("Error in store.forgotPassword");
    //     }
    //   } catch (e: any) {
    //     console.log(e.response?.data?.message);
    //   }
    // }

    // async setNewPassword(email: string, password: string) {
    //   //navjot
    //   try {
    //     const response = await setNewPasswordService.setNewPassword(email,password);
    //     console.log(response);

    //     if (response) {
    //       // this.setOtp(response.otp);
    //     } else {
    //       console.log("Error in store.forgotPassword");
    //     }
    //   } catch (e: any) {
    //     console.log(e.response?.data?.message);
    //   }
    // }

}