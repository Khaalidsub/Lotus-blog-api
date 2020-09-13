"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const Post_1 = require("../models/Post");
const PostService_1 = require("../services/PostService");
const passport_1 = require("@tsed/passport");
// import {tempId} from "./AuthController";
let PostController = class PostController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const posts = yield this.service.find({});
            return posts;
        });
    }
    //get posts of the logged  user
    // @Get("/my-posts")
    // // @Authorize("basic")
    // async getUserPosts(@Req("user") req: User) {
    //   $log.info("session", req);
    //   const posts = await this.service.find({user: tempId});
    //   return posts;
    // }
    //get the posts of another user
    getProfilePosts(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const posts = yield this.service.find({ user: id });
            return posts;
        });
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const post = yield this.service.findById(id);
            return post;
        });
    }
    add(post) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // post.user = req._id;
            // post.user = tempId;
            common_1.$log.info(post);
            const newPost = yield this.service.add(post);
            return newPost;
        });
    }
    updatePost(post) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatePost = this.service.set(post);
            return updatePost;
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
], PostController.prototype, "getAll", null);
tslib_1.__decorate([
    common_1.Get("/user-posts/:id"),
    tslib_1.__param(0, common_1.PathParams("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostController.prototype, "getProfilePosts", null);
tslib_1.__decorate([
    common_1.Get("/post/:id"),
    tslib_1.__param(0, common_1.PathParams("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostController.prototype, "get", null);
tslib_1.__decorate([
    common_1.Post(),
    passport_1.Authorize("jwt"),
    tslib_1.__param(0, common_1.BodyParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Post_1.Post]),
    tslib_1.__metadata("design:returntype", Promise)
], PostController.prototype, "add", null);
tslib_1.__decorate([
    common_1.Put("/update"),
    passport_1.Authorize("jwt"),
    tslib_1.__param(0, common_1.BodyParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Post_1.Post]),
    tslib_1.__metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
tslib_1.__decorate([
    common_1.Delete("/post/:id"),
    passport_1.Authorize("jwt"),
    tslib_1.__param(0, common_1.PathParams("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostController.prototype, "delete", null);
PostController = tslib_1.__decorate([
    common_1.Controller("/posts"),
    tslib_1.__param(0, common_1.Inject(PostService_1.PostService)),
    tslib_1.__metadata("design:paramtypes", [PostService_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map