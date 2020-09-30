/// <reference types="multer" />
export declare class UploadController {
    add(file: Express.Multer.File): Promise<any>;
    delete(name: string): Promise<any>;
}
