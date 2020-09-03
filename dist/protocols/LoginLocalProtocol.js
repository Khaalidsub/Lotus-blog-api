"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginLocalProtocol = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const passport_1 = require("@tsed/passport");
const passport_local_1 = require("passport-local");
const UserService_1 = require("../services/UserService");
let LoginLocalProtocol = class LoginLocalProtocol {
    constructor(usersService) {
        this.usersService = usersService;
    }
    $onVerify(request, credentials, sessionUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email, password } = credentials;
            const user = yield this.usersService.findOne({ email });
            if (!user) {
                return false;
                // OR throw new NotAuthorized("Wrong credentials")
            }
            if (!user.verifyPassword(password)) {
                return false;
                // OR throw new NotAuthorized("Wrong credentials")
            }
            sessionUser.user = user;
            sessionUser.user.password = "";
            common_1.$log.info("logged:", sessionUser);
            // request.user = user;
            return user;
        });
    }
    $onInstall(strategy) {
        // $log.info("strategory", strategy);
        // intercept the strategy instance to adding extra configuration
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.BodyParams()), tslib_1.__param(2, common_1.Session()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginLocalProtocol.prototype, "$onVerify", null);
LoginLocalProtocol = tslib_1.__decorate([
    passport_1.Protocol({
        name: "login",
        useStrategy: passport_local_1.Strategy,
        settings: {
            usernameField: "email",
            passwordField: "password",
        },
    }),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService])
], LoginLocalProtocol);
exports.LoginLocalProtocol = LoginLocalProtocol;
//# sourceMappingURL=LoginLocalProtocol.js.map