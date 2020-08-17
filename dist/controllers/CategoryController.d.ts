/// <reference types="mongoose" />
import { Category } from "../models/Category";
import { CategoryService } from "../services/CategoryService";
export declare class CategoryController {
    private service;
    constructor(service: CategoryService);
    getAll(): Promise<(Category & import("mongoose").Document)[] | undefined>;
    get(id: String): Promise<(Category & import("mongoose").Document) | null | undefined>;
    add(category: Category): Promise<(Category & import("mongoose").Document) | undefined>;
    delete(id: String): Promise<boolean>;
}
