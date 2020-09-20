/// <reference types="mongoose" />
import { Req } from "@tsed/common";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
import { PostService } from "../services/PostService";
import { Post as Posts } from "../models/Post";
export declare class UserController {
    userService: UserService;
    private service;
    constructor(userService: UserService, service: PostService);
    login(req: User): Promise<User>;
    signUp(req: User): User | undefined;
    getSession(req: User): Promise<User | null>;
    getUser(id: String): Promise<(User & import("mongoose").Document) | null | undefined>;
    toggleBookMark(id: string, req: User): Promise<(Posts & import("mongoose").Document) | null>;
    toggleLike(id: string, req: User): Promise<(Posts & import("mongoose").Document) | undefined>;
    logout(req: Req): void;
}
