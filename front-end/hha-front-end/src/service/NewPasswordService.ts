import {newPasswordResponse} from "../models/response/ForgotPasswordResponse";
import {AxiosResponse} from "axios";
import $api from "../http";

export default class setNewPasswordService {
  static async setNewPassword(
    email: string,
    password: string
  ): Promise<AxiosResponse<newPasswordResponse>> {
     return $api.post<newPasswordResponse>("/auth/forgotPassword/setNewPassword", { email,password });
  }
}