"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const multipartfiles_1 = require("@tsed/multipartfiles");
const passport_1 = require("@tsed/passport");
const multer_1 = require("multer");
const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
let UploadController = class UploadController {
    add(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                success: 1,
                file: {
                    url: `https://www.lotus-blogs-api.xyz/images/${file.filename}`,
                },
            };
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
        limits: {
            fieldSize: 10000 * 5000,
        },
    }),
    tslib_1.__param(0, multipartfiles_1.MultipartFile()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UploadController.prototype, "add", null);
UploadController = tslib_1.__decorate([
    common_1.Controller("/file")
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=FileController.js.map