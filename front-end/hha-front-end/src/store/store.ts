import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

import ForgotPasswordService from "../service/ForgotPasswordService";
import NewPasswordService from "../service/NewPasswordService";
import ChangePasswordService from "../service/ChangePasswordService";
import UserService from "../service/UserService";

export default class Store {
    isAuthorized = false;
    otp = 0;
    forgotPasswordEmail = "";
    currentUserEmail = "";

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

    setCurrentUserEmail(value: string){
        this.currentUserEmail = value;
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

    async userProfile(firstName: string, lastName: string, email: string){
        try {
            const response = await UserService.getUser(firstName, lastName, email);
            console.log(response.data);
        } catch (e: any){
            console.log(e.response?.data?.message);
        }
    }

}