export interface User {
    email: string;
    firstName: string;
    lastName: string;
    activationLink: string;
    roles: Array<any>;
}