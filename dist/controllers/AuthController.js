"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const UserService_1 = require("../services/UserService");
const passport_1 = require("@tsed/passport");
const User_1 = require("../models/User");
const PostService_1 = require("../services/PostService");
// export const tempId = "5f549bc077ff7458309f1b5c";
let UserController = class UserController {
    constructor(userService, service) {
        this.userService = userService;
        this.service = service;
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
                // $log.info("session", req);
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
    toggleBookMark(id, req) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let updatedPost;
            const foundPost = yield this.service.findById(id);
            if (!foundPost) {
                return null;
            }
            const result = (_a = req.bookMarkedPosts) === null || _a === void 0 ? void 0 : _a.find((postId) => postId.toString() === id.toString());
            if (result) {
                updatedPost = ((_b = req.bookMarkedPosts) === null || _b === void 0 ? void 0 : _b.filter((postId) => postId.toString() !== id.toString())) || [];
                req.bookMarkedPosts = updatedPost;
                foundPost.bookMarks = foundPost.bookMarks - 1;
            }
            else {
                updatedPost = ((_c = req.bookMarkedPosts) === null || _c === void 0 ? void 0 : _c.concat(id.toString())) || [id.toString()];
                req.bookMarkedPosts = updatedPost;
                foundPost.bookMarks = foundPost.bookMarks + 1;
            }
            common_1.$log.info(foundPost);
            yield this.userService.set(req);
            yield this.service.set(foundPost);
            return foundPost;
        });
    }
    toggleLike(id, req) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let updatedPost;
            const foundPost = yield this.service.findById(id);
            if (!foundPost) {
                return;
            }
            const result = (_a = req.likedPosts) === null || _a === void 0 ? void 0 : _a.find((postId) => postId.toString() === id.toString());
            if (result) {
                updatedPost = ((_b = req.likedPosts) === null || _b === void 0 ? void 0 : _b.filter((postId) => postId.toString() !== id.toString())) || [];
                req.likedPosts = updatedPost;
                foundPost.likes = foundPost.likes - 1;
            }
            else {
                updatedPost = ((_c = req.likedPosts) === null || _c === void 0 ? void 0 : _c.concat(id.toString())) || [id.toString()];
                req.likedPosts = updatedPost;
                foundPost.likes = foundPost.likes + 1;
            }
            yield this.userService.set(req);
            yield this.service.set(foundPost);
            return foundPost;
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
    common_1.Patch("/bookmark/:id"),
    passport_1.Authorize("jwt"),
    tslib_1.__param(0, common_1.PathParams("id")), tslib_1.__param(1, common_1.Req("account")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, User_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "toggleBookMark", null);
tslib_1.__decorate([
    common_1.Patch("/like/:id"),
    passport_1.Authorize("jwt"),
    tslib_1.__param(0, common_1.PathParams("id")), tslib_1.__param(1, common_1.Req("account")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, User_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "toggleLike", null);
tslib_1.__decorate([
    common_1.Get("/logout"),
    tslib_1.__param(0, common_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
UserController = tslib_1.__decorate([
    common_1.Controller(""),
    tslib_1.__param(0, common_1.Inject(UserService_1.UserService)), tslib_1.__param(1, common_1.Inject(PostService_1.PostService)),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService, PostService_1.PostService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=AuthController.js.map