import { IModel } from "./IModel";
export declare class User implements IModel {
    _id: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    likedPosts?: string[];
    bookMarkedPosts?: string[];
    verifyPassword(password: string): Promise<boolean>;
}
