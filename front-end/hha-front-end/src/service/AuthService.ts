import $api from "../http";
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password})
    }
}

//navjot - uncomment line below after implementing backend route
// export class ForgotPasswordService {
//   static async ForgotPassword(
//     email: string
//   ): Promise<AxiosResponse<ForgotPasswordResponse>> {
//     //return $api.get<ForgotPasswordResponse>("/auth/forgotPassword", { email });

//   }
// }

//navjot - uncomment line below after implementing backend route
// export class setNewPasswordService {
//   static async setNewPassword(
//     email: string,
//     password: string
//   ): Promise<AxiosResponse<newPasswordResponse>> {
//     //return $api.post<newPasswordResponse>("/auth/forgotPassword/setNewPassword", { email,password });
//   }
// }


