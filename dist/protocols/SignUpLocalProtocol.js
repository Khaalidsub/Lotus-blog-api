"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupLocalProtocol = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const passport_1 = require("@tsed/passport");
const passport_local_1 = require("passport-local");
const exceptions_1 = require("@tsed/exceptions");
const UserService_1 = require("../services/UserService");
const User_1 = require("../models/User");
let SignupLocalProtocol = class SignupLocalProtocol {
    constructor(usersService) {
        this.usersService = usersService;
    }
    $onVerify(request, user, session) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                common_1.$log.info("here in protocol", user);
                const { email } = user;
                const found = yield this.usersService.findOne({ email });
                if (found) {
                    throw new exceptions_1.Forbidden("Email is already registered");
                }
                const foundUser = yield this.usersService.add(user);
                if (foundUser)
                    session.user = foundUser;
                //  await this.usersService.findOne(user.email);
                return foundUser;
            }
            catch (error) {
                common_1.$log.error(error);
            }
        });
    }
    $onInstall(strategy) {
        // intercept the strategy instance to adding extra configuration
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.BodyParams()), tslib_1.__param(2, common_1.Session()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, User_1.User, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupLocalProtocol.prototype, "$onVerify", null);
SignupLocalProtocol = tslib_1.__decorate([
    passport_1.Protocol({
        name: "signup",
        useStrategy: passport_local_1.Strategy,
        settings: {
            usernameField: "email",
            passwordField: "password",
        },
    }),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService])
], SignupLocalProtocol);
exports.SignupLocalProtocol = SignupLocalProtocol;
//# sourceMappingURL=SignUpLocalProtocol.js.map