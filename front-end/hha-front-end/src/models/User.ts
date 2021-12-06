export interface User {
    email: string;
    firstName: string;
    lastName: string;
    firstTimeUser: boolean;
    activationLink: string;
    roles: Array<any>;
}