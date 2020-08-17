"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@tsed/mongoose");
const common_1 = require("@tsed/common");
let Category = class Category {
};
tslib_1.__decorate([
    mongoose_1.ObjectID("id"),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "_id", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
Category = tslib_1.__decorate([
    mongoose_1.Model()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map