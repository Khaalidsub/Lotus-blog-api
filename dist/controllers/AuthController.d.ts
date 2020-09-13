/// <reference types="mongoose" />
import { Req } from "@tsed/common";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
export declare class UserController {
    userService: UserService;
    constructor(userService: UserService);
    login(req: User): Promise<User>;
    signUp(req: User): User | undefined;
    getSession(req: User): Promise<User | null>;
    getUser(id: String): Promise<(User & import("mongoose").Document) | null | undefined>;
    logout(req: Req): void;
}
