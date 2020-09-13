"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProtocol = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const passport_1 = require("@tsed/passport");
const passport_jwt_1 = require("passport-jwt");
const UserService_1 = require("../services/UserService");
let JwtProtocol = class JwtProtocol {
    constructor(usersService) {
        this.usersService = usersService;
    }
    $onVerify(req, jwtPayload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.$log.info("i am here", jwtPayload, req.headers);
            const user = yield this.usersService.findOne({ id: jwtPayload.sub });
            common_1.$log.info("found", user);
            return user ? user : false;
        });
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, passport_1.Arg(0)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JwtProtocol.prototype, "$onVerify", null);
JwtProtocol = tslib_1.__decorate([
    passport_1.Protocol({
        name: "jwt",
        useStrategy: passport_jwt_1.Strategy,
        settings: {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "app",
        },
    }),
    tslib_1.__param(0, common_1.Inject(UserService_1.UserService)),
    tslib_1.__metadata("design:paramtypes", [UserService_1.UserService])
], JwtProtocol);
exports.JwtProtocol = JwtProtocol;
//# sourceMappingURL=JWTProtocol.js.map