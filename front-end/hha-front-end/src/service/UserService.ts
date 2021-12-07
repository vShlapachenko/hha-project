import $api from "../http";
import {AxiosResponse} from 'axios'
import {User} from "../models/User";

export default class UserService {
   
    static fetchUsers(): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('/hha-user/getUsers')
    }

    static saveUser(firstName: String, lastName: String, password: String, email: string, roles: Array<any>): Promise<AxiosResponse<User[]>> {
        return $api.post<User[]>('/hha-user/saveUser', {firstName, lastName, password, email, roles})
    }

    static getCurrentUser(email: any): Promise<AxiosResponse<User>> {
        return $api.get<User>(`/hha-user/getCurrentUser?email=${email}`);
    }

    static getUser(): Promise<AxiosResponse<User>>{
        return $api.get<User>('hha-user/userProfile')
    }
}

// i am following the following schema:
// public class HhaUser {
//     @Id
//     private String id;
//     private String email;
//     private String firstName;
//     private String lastName;
//     private String password;
//     private String activationLink;
//     @DBRef(lazy = true)
//     private List<Role> roles = new ArrayList<>();
//     @DBRef
//     private Department department;
//     private ActivationStatus activationStatus;
// }
