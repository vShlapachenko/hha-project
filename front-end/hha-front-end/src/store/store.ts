import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

import ForgotPasswordService from "../service/ForgotPasswordService";
import setNewPasswordService from "../service/NewPasswordService";

export default class Store {
    isAuthorized = false;
    otp = 0;
    forgotPasswordEmail = "";
    new_password = "";

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

    setPassword(value: string){
        this.new_password = value;
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

            const response = await ForgotPasswordService.ForgotPassword(email);

            if (response) {
                if (response.data === 0){
                    this.setOtp(403)
                }else {
                    this.setOtp(response.data);
                }
            } else {
                console.log("Error in store.forgotPassword");
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async setNewPassword(email: string, password: string) {
        try {
            const response = await setNewPasswordService.setNewPassword(email, password);
            console.log("whatevar", password);
            if(response) {
                console.log("password", response);
                this.setPassword(password);
            }else {
                console.log("Error in store.setNewPassword");
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

}