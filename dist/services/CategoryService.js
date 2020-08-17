"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const common_1 = require("@tsed/common");
const Category_1 = require("../models/Category");
const GenericService_1 = require("./GenericService");
let CategoryService = class CategoryService extends GenericService_1.GenericService {
    constructor(model) {
        super(model);
        this.model = model;
        common_1.$log.info(model);
    }
};
CategoryService = tslib_1.__decorate([
    di_1.Service(),
    tslib_1.__param(0, di_1.Inject(Category_1.Category)),
    tslib_1.__metadata("design:paramtypes", [Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map