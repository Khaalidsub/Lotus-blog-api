/// <reference types="express-session" />
/// <reference types="mongoose" />
import { Req } from "@tsed/common";
import { OnInstall, OnVerify } from "@tsed/passport";
import { Strategy } from "passport-local";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
export declare class SignupLocalProtocol implements OnVerify, OnInstall {
    private usersService;
    constructor(usersService: UserService);
    $onVerify(request: Req, user: User, session: Express.Session): Promise<(User & import("mongoose").Document) | undefined>;
    $onInstall(strategy: Strategy): void;
}
