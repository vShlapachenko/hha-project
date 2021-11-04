import axios, { AxiosResponse } from "axios";
import $api from "../http";
import {ChangePasswordRequest} from "../models/request/ChangePasswordRequest";

export default class ChangePasswordService {
    static async ChangePassword(email: string, oldPassword: string, newPassword: string): Promise<AxiosResponse<ChangePasswordRequest>> {
        return axios.post<ChangePasswordRequest>(
            "http://localhost:8080/api/hha-user/changePassword",
            { email: email, oldPassword: oldPassword, newPassword: newPassword }
        );
    }
}