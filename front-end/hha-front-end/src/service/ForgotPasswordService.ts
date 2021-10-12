import {AxiosResponse} from "axios";
import {ForgotPasswordResponse} from "../models/response/ForgotPasswordResponse";
import $api from "../http";

export default class ForgotPasswordService {
  static async ForgotPassword(
    email: string, otp:string
  ): Promise<AxiosResponse<ForgotPasswordResponse>> {
      return $api.post<ForgotPasswordResponse>("/auth/forgotPassword", { email, otp});
  }
}