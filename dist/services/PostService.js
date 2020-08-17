"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const common_1 = require("@tsed/common");
const Post_1 = require("../models/Post");
const GenericService_1 = require("./GenericService");
let PostService = class PostService extends GenericService_1.GenericService {
    constructor(model) {
        super(model);
        this.model = model;
        common_1.$log.info(model);
    }
};
PostService = tslib_1.__decorate([
    di_1.Service(),
    tslib_1.__param(0, di_1.Inject(Post_1.Post)),
    tslib_1.__metadata("design:paramtypes", [Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map