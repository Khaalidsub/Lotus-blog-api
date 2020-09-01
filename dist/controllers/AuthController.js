"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const UserService_1 = require("../services/UserService");
const passport_1 = require("@tsed/passport");
const User_1 = require("../models/User");
let UserController = class UserController {
    constructor(userService) { }
    login(req, credential) {
        common_1.$log.info("here in auth", req.user);
    }
    signUp(req, user) {
        try {
            common_1.$log.info("here in sign up", user);
        }
        catch (error) {
            common_1.$log.error(error);
        }
    }
    getSession(req) {
        try {
            return req;
        }
        catch (error) {
            common_1.$log.error(error);
        }
    }
    logout(req) {
        try {
        }
        catch (error) {
            common_1.$log.error(error);
        }
    }
};
tslib_1.__decorate([
    common_1.Post("/login"),
    passport_1.Authenticate("login"),
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.BodyParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    common_1.Post("/signup"),
    passport_1.Authenticate("signup"),
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.BodyParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, User_1.User]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "signUp", null);
tslib_1.__decorate([
    common_1.Post("/session"),
    passport_1.Authorize("basic"),
    tslib_1.__param(0, common_1.Req("user")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_1.User]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "getSession", null);
tslib_1.__decorate([
    common_1.Post("/logout"),
    passport_1.Authorize("basic"),
    tslib_1.__param(0, common_1.Req("user")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_1.User]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
UserController = tslib_1.__decorate([
    common_1.Controller(""),
    tslib_1.__param(0, common_1.Inject(UserService_1.UserService)),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=AuthController.js.map