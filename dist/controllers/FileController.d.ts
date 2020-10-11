/// <reference types="multer" />
import { User } from "../models/User";
import e from "express";
export declare class UploadController {
    add(file: Express.Multer.File, req: User, res: e.Response): Promise<any>;
    delete(name: string): Promise<any>;
}
