import { newPasswordResponse } from "../models/response/ForgotPasswordResponse";
import { AxiosResponse } from "axios";
import $api from "../http";

export default class ChangePasswordService {
    static async ChangePassword(email: string, password: string): Promise<AxiosResponse<newPasswordResponse>> {
        return $api.post<newPasswordResponse>(
            "/hha-user/changePassword",
            { email: email, password: password }
        );
    }
}