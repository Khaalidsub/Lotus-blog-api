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
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
let SignupLocalProtocol = class SignupLocalProtocol {
    constructor(usersService) {
        this.usersService = usersService;
    }
    $onVerify(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // $log.info("here in protocol", user);
                const { email } = user;
                const found = yield this.usersService.findOne({ email });
                if (found) {
                    throw new exceptions_1.Forbidden("Email is already registered");
                }
                const password = yield bcrypt_1.hash(user.password, saltRounds);
                user.password = password;
                const newUser = yield this.usersService.add(user);
                if (!newUser) {
                    return false;
                }
                //  await this.usersService.findOne(user.email);
                const token = jsonwebtoken_1.sign(newUser.id, "app");
                common_1.$log.info("this is token", token);
                return token;
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
    tslib_1.__param(0, common_1.BodyParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupLocalProtocol.prototype, "$onVerify", null);
SignupLocalProtocol = tslib_1.__decorate([
    passport_1.Protocol({
        name: "signup",
        useStrategy: passport_local_1.Strategy,
        settings: {
            usernameField: "email",
            passwordField: "password",
            session: false,
        },
    }),
    tslib_1.__param(0, common_1.Inject(UserService_1.UserService)),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService])
], SignupLocalProtocol);
exports.SignupLocalProtocol = SignupLocalProtocol;
//# sourceMappingURL=SignUpLocalProtocol.js.map