import { MongooseModel } from "@tsed/mongoose";
import { Post } from "../models/Post";
import { GenericService } from "./GenericService";
export declare class PostService extends GenericService<Post> {
    model: MongooseModel<Post>;
    constructor(model: MongooseModel<Post>);
}
