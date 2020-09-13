import { Req } from "@tsed/common";
import { OnInstall, OnVerify } from "@tsed/passport";
import { Strategy } from "passport-local";
import { UserService } from "../services/UserService";
import { ICredential } from "../models/ICredential";
export declare class LoginLocalProtocol implements OnVerify, OnInstall {
    usersService: UserService;
    constructor(usersService: UserService);
    $onVerify(request: Req, credentials: ICredential): Promise<string | false>;
    $onInstall(strategy: Strategy): void;
}
