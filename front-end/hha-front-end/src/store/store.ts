import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    isAuthorized = false;

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuthorized(bool: boolean){
        this.isAuthorized = bool;
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
}