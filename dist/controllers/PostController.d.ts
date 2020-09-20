/// <reference types="mongoose" />
import { Post as Posts } from "../models/Post";
import { PostService } from "../services/PostService";
import { UserService } from "../services/UserService";
export declare class PostController {
    private service;
    userService: UserService;
    constructor(service: PostService, userService: UserService);
    getAll(): Promise<(Posts & import("mongoose").Document)[] | undefined>;
    getProfilePosts(id: String): Promise<(Posts & import("mongoose").Document)[] | undefined>;
    get(id: String): Promise<(Posts & import("mongoose").Document) | null | undefined>;
    add(post: Posts): Promise<(Posts & import("mongoose").Document) | undefined>;
    updatePost(post: Posts): Promise<any>;
    delete(id: String): Promise<boolean>;
}
