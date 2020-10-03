"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const multipartfiles_1 = require("@tsed/multipartfiles");
const fs_1 = require("fs");
const aws_1 = require("../config/aws");
const util_1 = require("util");
const firebase_1 = require("../config/firebase");
const passport_1 = require("@tsed/passport");
const User_1 = require("../models/User");
const rename = util_1.promisify(fs_1.rename);
// const uploadFile = promisify(capella.uploadFile);
let UploadController = class UploadController {
    add(file, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.$log.info("in adding an image", file, process.cwd());
            try {
                const pos = file.path.lastIndexOf(".");
                const showFile = file.path.substr(0, pos < 0 ? file.path.length : pos) +
                    file.originalname.substr(file.originalname.lastIndexOf("."), file.originalname.length);
                yield rename(file.path, `${process.cwd()}/images/${file.filename}.jpg`);
                const fileContent = fs_1.readFileSync(showFile);
                const fileUpload = `${req.email}/${file.originalname}`;
                //!needs to fix and rename this,after this think why iti was not working
                common_1.$log.info("file uploaded", showFile, fileContent);
                const result = yield firebase_1.bucket.upload(showFile, { contentType: file.mimetype, public: true });
                return {
                    success: 1,
                    file: {
                        url: result[0].baseUrl,
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
    multipartfiles_1.MulterOptions({ dest: `/images` }),
    tslib_1.__param(0, multipartfiles_1.MultipartFile()), tslib_1.__param(1, common_1.Req("account")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, User_1.User]),
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