import { AxiosResponse } from "axios";
import $api from "../http";

export default class ForgotPasswordService {
    static async ForgotPassword(email: string): Promise<AxiosResponse<number>> {
        return $api.post<number>("/hha-user/forgotPassword", {
            email: email,
        });
    }
}
