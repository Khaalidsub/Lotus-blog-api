import { OnInstall, OnVerify } from "@tsed/passport";
import { Strategy } from "passport";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
export declare class BasicProtocol implements OnVerify, OnInstall {
    private usersService;
    constructor(usersService: UserService);
    $onVerify(user: User): Promise<boolean>;
    $onInstall(strategy: Strategy): void;
}
