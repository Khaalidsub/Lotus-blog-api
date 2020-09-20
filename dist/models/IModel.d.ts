import { Schema } from "mongoose";
export interface IModel {
    _id: String;
}
export declare function autoPopulateAllFields(schema: Schema): void;
