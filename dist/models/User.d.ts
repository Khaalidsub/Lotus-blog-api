import { IModel } from "./IModel";
export declare class User implements IModel {
    _id: string;
    name: string;
    email: string;
    password: string;
    verifyPassword(password: string): boolean;
}
