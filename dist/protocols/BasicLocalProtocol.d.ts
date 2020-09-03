/// <reference types="express-session" />
import { OnInstall, OnVerify } from "@tsed/passport";
import { Strategy } from "passport";
import { UserService } from "../services/UserService";
export declare class BasicProtocol implements OnVerify, OnInstall {
    private usersService;
    constructor(usersService: UserService);
    $onVerify(session: Express.Session): Promise<boolean>;
    $onInstall(strategy: Strategy): void;
}
