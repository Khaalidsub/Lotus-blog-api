"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicProtocol = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const passport_1 = require("@tsed/passport");
const passport_http_1 = require("passport-http");
const UserService_1 = require("../services/UserService");
const User_1 = require("../models/User");
let BasicProtocol = class BasicProtocol {
    constructor(usersService) {
        this.usersService = usersService;
    }
    $onVerify(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.$log.info("here in basic protocol", user);
            if (!user) {
                return false;
            }
            else
                return true;
        });
    }
    $onInstall(strategy) {
        // intercept the strategy instance to adding extra configuration
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, common_1.Req("user")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], BasicProtocol.prototype, "$onVerify", null);
BasicProtocol = tslib_1.__decorate([
    passport_1.Protocol({
        name: "basic",
        useStrategy: passport_http_1.BasicStrategy,
        settings: {},
    }),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService])
], BasicProtocol);
exports.BasicProtocol = BasicProtocol;
//# sourceMappingURL=BasicLocalProtocol.js.map