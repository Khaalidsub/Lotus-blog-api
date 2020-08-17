import { MongooseModel } from "@tsed/mongoose";
import { Category } from "../models/Category";
import { GenericService } from "./GenericService";
export declare class CategoryService extends GenericService<Category> {
    model: MongooseModel<Category>;
    constructor(model: MongooseModel<Category>);
}
