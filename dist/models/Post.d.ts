import { Ref } from "@tsed/mongoose";
import { Category } from "./Category";
import { User } from "./User";
import { IModel } from "./IModel";
export declare class Post implements IModel {
    _id: string;
    title: string;
    subtitle: string;
    blocks: [];
    createdAt?: Date;
    image?: string;
    likedPosts?: Ref<Post[]>;
    bookMarkedPosts?: Ref<Post[]>;
    category: Ref<Category>;
    user: Ref<User>;
}
