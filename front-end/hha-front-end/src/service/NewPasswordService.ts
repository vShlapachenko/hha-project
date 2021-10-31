import axios, { AxiosResponse } from "axios";
import {NewPasswordRequest} from "../models/request/NewPasswordRequest";

export default class NewPasswordService {
    static async NewPassword(email: string, password: string): Promise<AxiosResponse<NewPasswordRequest>> {
        return axios.post<NewPasswordRequest>(
            "http://localhost:8080/api/hha-user/forgotPassword/enterNewPassword",
            { email: email, password: password }
        );
    }
}