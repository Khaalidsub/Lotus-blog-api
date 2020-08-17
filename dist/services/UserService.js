"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const common_1 = require("@tsed/common");
const User_1 = require("../models/User");
const GenericService_1 = require("./GenericService");
let UserService = class UserService extends GenericService_1.GenericService {
    constructor(model) {
        super(model);
        this.model = model;
        common_1.$log.info(model);
    }
    findOne(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this.model.findOne(email);
            }
            catch (error) {
                common_1.$log.error(error);
                return null;
            }
        });
    }
};
UserService = tslib_1.__decorate([
    di_1.Service(),
    tslib_1.__param(0, di_1.Inject(User_1.User)),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map