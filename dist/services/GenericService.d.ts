import { IService } from "./IService";
import { MongooseModel } from "@tsed/mongoose";
import { Document } from "mongoose";
import { IModel } from "../models/IModel";
export declare class GenericService<T extends IModel> implements IService<T> {
    model: MongooseModel<T>;
    constructor(model: MongooseModel<T>);
    add(obj: T): Promise<(T & Document) | undefined>;
    find(query: any): Promise<(T & Document)[] | undefined>;
    findById(id: String, populate?: String): Promise<(T & Document) | null | undefined>;
    set(obj: T): Promise<any>;
    delete(id: String): Promise<boolean>;
}
