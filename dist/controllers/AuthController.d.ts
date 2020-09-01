import { Req } from "@tsed/common";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
import { ICredential } from "../models/ICredential";
export declare class UserController {
    constructor(userService: UserService);
    login(req: Req, credential: ICredential): void;
    signUp(req: Req, user: User): void;
    getSession(req: User): User | undefined;
    logout(req: User): void;
}
