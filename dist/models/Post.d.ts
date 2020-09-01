import { Ref } from "@tsed/mongoose";
import { Category } from "./Category";
import { User } from "./User";
import { IModel } from "./IModel";
export declare class Post implements IModel {
    _id: string;
    title: string;
    subtitle: string;
    blocks: any;
    createdAt?: Date;
    image?: string;
    category: Ref<Category>;
    user: Ref<User>;
}
