/// <reference types="mongoose" />
import { Req } from "@tsed/common";
import { OnVerify } from "@tsed/passport";
import { UserService } from "../services/UserService";
export declare class JwtProtocol implements OnVerify {
    usersService: UserService;
    constructor(usersService: UserService);
    $onVerify(req: Req, jwtPayload: any): Promise<false | (import("../models/User").User & import("mongoose").Document)>;
}
