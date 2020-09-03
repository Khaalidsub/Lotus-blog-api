import { Req } from "@tsed/common";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
import { ICredential } from "../models/ICredential";
export declare class UserController {
    userService: UserService;
    constructor(userService: UserService);
    login(req: Req, credential: ICredential, user: any): Promise<void>;
    signUp(req: Req, user: User): void;
    getSession(session: any): any;
    logout(req: User): void;
}
