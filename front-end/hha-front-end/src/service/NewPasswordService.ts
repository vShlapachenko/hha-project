import { newPasswordResponse } from "../models/response/ForgotPasswordResponse";
import { AxiosResponse } from "axios";
import $api from "../http";

export default class setNewPasswordService {
    static async setNewPassword(email: string, password: string): Promise<AxiosResponse<newPasswordResponse>> {
        return $api.post<newPasswordResponse>(
            "/hha-user/forgotPassword/setNewPassword",
            { email: email, password: password }
        );
    }
}