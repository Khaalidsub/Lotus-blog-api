import { OnInstall, OnVerify } from "@tsed/passport";
import { Strategy } from "passport-local";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
export declare class SignupLocalProtocol implements OnVerify, OnInstall {
    usersService: UserService;
    constructor(usersService: UserService);
    $onVerify(user: User): Promise<string | false | undefined>;
    $onInstall(strategy: Strategy): void;
}
