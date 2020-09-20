"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const Category_1 = require("../models/Category");
const CategoryService_1 = require("../services/CategoryService");
let CategoryController = class CategoryController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const posts = yield this.service.find({});
            return posts;
        });
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.service.findById(id);
            return category;
        });
    }
    add(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newPost = yield this.service.add(category);
            return newPost;
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.delete(id);
            return response;
        });
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
tslib_1.__decorate([
    common_1.Get("/category/:id"),
    tslib_1.__param(0, common_1.PathParams("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "get", null);
tslib_1.__decorate([
    common_1.Post(),
    tslib_1.__param(0, common_1.BodyParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Category_1.Category]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "add", null);
tslib_1.__decorate([
    common_1.Delete("/category/:id"),
    tslib_1.__param(0, common_1.PathParams("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = tslib_1.__decorate([
    common_1.Controller("/categories"),
    tslib_1.__param(0, common_1.Inject(CategoryService_1.CategoryService)),
    tslib_1.__metadata("design:paramtypes", [CategoryService_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map