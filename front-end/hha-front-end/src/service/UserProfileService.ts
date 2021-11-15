import { AxiosResponse } from "axios";
import $api from "../http";
import {UserProfileRequest} from "../models/request/UserProfileRequest";
import {User} from "../models/User";

export default class UserProfileService {
    static UserProfile(email: string): Promise<AxiosResponse<UserProfileRequest>> {
        return $api.post<UserProfileRequest>(
            "/hha-user/userProfile",
            { email: email}
        );
    }
}