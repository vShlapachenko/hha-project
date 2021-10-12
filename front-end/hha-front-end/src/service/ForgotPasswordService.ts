import { AxiosResponse } from "axios";
import axios from "axios";
import { ForgotPasswordResponse } from "../models/response/ForgotPasswordResponse";
import $api,{$api_public} from "../http";

export default class ForgotPasswordService {
    static async ForgotPassword(email: string): Promise<AxiosResponse<number>> {
        return $api_public.post<number>("/hha-user/forgotPassword", {
            email: email,
        });
    }
}
