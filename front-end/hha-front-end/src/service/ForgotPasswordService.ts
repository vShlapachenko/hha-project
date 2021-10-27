import axios, { AxiosResponse } from "axios";

export default class ForgotPasswordService {
    static async ForgotPassword(email: string): Promise<AxiosResponse<number>> {
        return axios.post<number>("http://localhost:8080/api/hha-user/forgotPassword", {
            email: email,
        });
    }
}
