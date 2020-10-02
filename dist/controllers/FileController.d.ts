/// <reference types="multer" />
import { User } from "../models/User";
export declare class UploadController {
    add(file: Express.Multer.File, req: User): Promise<any>;
    delete(name: string): Promise<any>;
}
