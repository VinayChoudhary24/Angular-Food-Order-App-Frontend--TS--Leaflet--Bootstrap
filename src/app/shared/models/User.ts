import { UserRegister } from "../interfaces/UserRegister";

// To Store the User in LocalStorage
export class User {
    id?: string;
    email!: string;
    name!: string;
    password!: string;
    address!: string;
    token?: string;
    // isAdmin!: boolean;
}
