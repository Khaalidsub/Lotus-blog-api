"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const mongoose_1 = require("@tsed/mongoose");
let User = class User {
    verifyPassword(password) {
        return this.password === password;
    }
};
tslib_1.__decorate([
    mongoose_1.ObjectID("id"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "_id", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
User = tslib_1.__decorate([
    mongoose_1.Model()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map