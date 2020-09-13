"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const UserService_1 = require("../services/UserService");
const passport_1 = require("@tsed/passport");
const User_1 = require("../models/User");
// export const tempId = "5f549bc077ff7458309f1b5c";
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return req;
        });
    }
    signUp(req) {
        try {
            // $log.info(req);
            return req;
        }
        catch (error) {
            common_1.$log.error(error);
        }
    }
    getSession(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // const user = req.user || {id: null};
                // $log.info(req.session);
                // return user;
                // const user = await this.userService.findById(tempId);
                common_1.$log.info("session", req);
                req.password = "";
                return req;
            }
            catch (error) {
                common_1.$log.error(error);
                return null;
            }
        });
    }
    getUser(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findById(id);
                return user;
            }
            catch (error) {
                common_1.$log.error(error);
                return null;
            }
        });
    }
    logout(req) {
        try {
            req.logout();
            req.user = undefined;
            common_1.$log.info("logged out", req.session);
        }
        catch (error) {
            common_1.$log.error(error);
        }
    }
};
tslib_1.__decorate([
    common_1.Post("/login"),
    passport_1.Authenticate("login"),
    tslib_1.__param(0, common_1.Req("user")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    common_1.Post("/signup"),
    passport_1.Authenticate("signup"),
    tslib_1.__param(0, common_1.Req("user")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_1.User]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "signUp", null);
tslib_1.__decorate([
    common_1.Get("/session"),
    passport_1.Authorize("jwt"),
    tslib_1.__param(0, common_1.Req("account")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getSession", null);
tslib_1.__decorate([
    common_1.Get("/user/:id"),
    tslib_1.__param(0, common_1.PathParams("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
tslib_1.__decorate([
    common_1.Get("/logout"),
    tslib_1.__param(0, common_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
UserController = tslib_1.__decorate([
    common_1.Controller(""),
    tslib_1.__param(0, common_1.Inject(UserService_1.UserService)),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=AuthController.js.map