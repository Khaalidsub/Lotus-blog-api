/// <reference types="mongoose" />
import { Req } from "@tsed/common";
import { OnInstall, OnVerify } from "@tsed/passport";
import { Strategy } from "passport-local";
import { UserService } from "../services/UserService";
import { ICredential } from "../models/ICredential";
import { User } from "../models/User";
export declare class LoginLocalProtocol implements OnVerify, OnInstall {
    private usersService;
    constructor(usersService: UserService);
    $onVerify(request: Req, credentials: ICredential, sessionUser: User): Promise<false | (User & import("mongoose").Document)>;
    $onInstall(strategy: Strategy): void;
}
