/// <reference types="mongoose" />
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../models/User";
import { GenericService } from "./GenericService";
export declare class UserService extends GenericService<User> {
    model: MongooseModel<User>;
    constructor(model: MongooseModel<User>);
    findOne(email: any): Promise<(User & import("mongoose").Document) | null>;
}
