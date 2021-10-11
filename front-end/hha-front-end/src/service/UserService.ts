import $api from "../http";
import {AxiosResponse} from 'axios'
import {User} from "../models/User";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('/hha-user/getUsers')
    }

    static saveUser(email: String, firstName: String, lastNmae: String, password: String, activationLink: String, roles: any, department: any, activationStatus: any): Promise<AxiosResponse<User[]>> {
        return $api.post<User[]>('/hha-user/saveUser', {email, firstName, lastNmae, password, activationLink, roles, department, activationStatus})
    }
}


// public class HhaUser {
//     @Id
//     private String id;
//     private String email;
//     private String firstName;
//     private String lastName;
//     private String password;
//     private String activationLink;
//     @DBRef(lazy = true)
//     private Collection<Role> roles = new ArrayList<>();
//     @DBRef
//     private Department department;
//     private ActivationStatus activationStatus;
// }

// const hhaUsers = {
//     "id": "",
//     "email": "",
//     "firstName": "",
//     "last": "",
//     "password": "",
//     "activationLink": null,
//     "roles": [],
//     "department": null,
//     "activationStatus": "ACTIVATED",
//     "confirmationLink": null
   
//     };