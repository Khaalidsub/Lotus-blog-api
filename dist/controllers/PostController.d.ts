/// <reference types="mongoose" />
import { Post as Posts } from "../models/Post";
import { PostService } from "../services/PostService";
export declare class PostController {
    private service;
    constructor(service: PostService);
    getAll(): Promise<(Posts & import("mongoose").Document)[] | undefined>;
    getProfilePosts(id: String): Promise<(Posts & import("mongoose").Document)[] | undefined>;
    get(id: String): Promise<(Posts & import("mongoose").Document) | null | undefined>;
    add(post: Posts): Promise<(Posts & import("mongoose").Document) | undefined>;
    updatePost(post: Posts): Promise<any>;
    delete(id: String): Promise<boolean>;
}
