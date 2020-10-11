"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const multipartfiles_1 = require("@tsed/multipartfiles");
const fs_1 = require("fs");
const aws_1 = require("../config/aws");
const util_1 = require("util");
// import {bucket} from "../config/firebase";
const passport_1 = require("@tsed/passport");
const User_1 = require("../models/User");
const express_1 = require("express");
const multer_1 = require("multer");
// import * as uuid from "uuid-v4";
const rename = util_1.promisify(fs_1.rename);
// const metadata = {
//   metadata: {
//     // This line is very important. It's to create a download token.
//     firebaseStorageDownloadTokens: uuid(),
//   },
//   contentType: "image/png",
//   cacheControl: "public, max-age=31536000",
// };
// const uploadFile = promisify(capella.uploadFile);
const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
let UploadController = class UploadController {
    add(file, req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.$log.info("in adding an image", file);
            try {
                // const pos = file.path.lastIndexOf(".");
                // const showFile = file.path.substr(0, pos < 0 ? file.path.length : pos) + ".jpg";
                // file.originalname.substr(file.originalname.lastIndexOf("."), file.originalname.length);
                // await rename(file.path, `${process.env.IMAGEDIR}/${file.originalname}`);
                // const fileContent = readFileSync(showFile);
                // const fileUpload = `${req.email}/${file.originalname}`;
                //!needs to fix and rename this,after this think why iti was not working
                // $log.info("file uploaded", showFile);
                // bucket.
                // const result = await bucket.upload(showFile, {contentType: file.mimetype, public: true, gzip: true, metadata: metadata});
                return {
                    success: 1,
                    file: {
                        url: `http://10.100.25.59:8081/images/${file.filename}`,
                    },
                };
            }
            catch (error) {
                common_1.$log.error(error);
                return {
                    success: 0,
                };
            }
        });
    }
    delete(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const params = {
                Bucket: "blog",
                Key: name,
            };
            try {
                const result = yield aws_1.s3.deleteObject(params).promise();
                return result.DeleteMarker;
            }
            catch (error) {
                common_1.$log.error(error);
                return error;
            }
            // $log.info("file", result);
        });
    }
};
tslib_1.__decorate([
    common_1.Post("/upload"),
    passport_1.Authorize("jwt"),
    multipartfiles_1.MulterOptions({
        storage: multer_1.diskStorage({
            destination: (req, file, cb) => {
                cb(null, process.env.IMAGEDIR || `/images`);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + ".jpg");
            },
        }),
        fileFilter: imageFilter,
    }),
    tslib_1.__param(0, multipartfiles_1.MultipartFile()), tslib_1.__param(1, common_1.Req("account")), tslib_1.__param(2, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, User_1.User, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UploadController.prototype, "add", null);
tslib_1.__decorate([
    common_1.Delete("/delete/:name"),
    tslib_1.__param(0, common_1.PathParams("name")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UploadController.prototype, "delete", null);
UploadController = tslib_1.__decorate([
    common_1.Controller("/file")
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=FileController.js.map