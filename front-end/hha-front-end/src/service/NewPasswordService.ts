import { newPasswordResponse } from "../models/response/ForgotPasswordResponse";
import axios, { AxiosResponse } from "axios";

export default class setNewPasswordService {
    static async setNewPassword(email: string, password: string): Promise<AxiosResponse<newPasswordResponse>> {
        return axios.post<newPasswordResponse>(
            "http://localhost:8080/api/hha-user/forgotPassword/enterNewPassword",
            { email: email, password: password }
        );
    }
}
