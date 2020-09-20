"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const mongoose_1 = require("@tsed/mongoose");
const Category_1 = require("./Category");
const User_1 = require("./User");
const IModel_1 = require("./IModel");
let Post = class Post {
};
tslib_1.__decorate([
    mongoose_1.ObjectID("id"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "_id", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "subtitle", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "blocks", void 0);
tslib_1.__decorate([
    common_1.Property(),
    common_1.Default(Date.now),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
tslib_1.__decorate([
    common_1.Property(),
    common_1.Default(""),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "image", void 0);
tslib_1.__decorate([
    common_1.Property(),
    common_1.Default(0),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "bookMarks", void 0);
tslib_1.__decorate([
    common_1.Default(0),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "likes", void 0);
tslib_1.__decorate([
    mongoose_1.Ref(Category_1.Category),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    mongoose_1.Ref(User_1.User),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "user", void 0);
Post = tslib_1.__decorate([
    mongoose_1.Model(),
    mongoose_1.MongoosePlugin(IModel_1.autoPopulateAllFields)
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map