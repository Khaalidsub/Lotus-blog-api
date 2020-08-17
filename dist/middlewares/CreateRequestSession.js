"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequestSessionMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
let CreateRequestSessionMiddleware = class CreateRequestSessionMiddleware {
    use(request) {
        if (request.session) {
            request.session.user = request.session.user || {
                id: null,
            };
        }
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, common_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], CreateRequestSessionMiddleware.prototype, "use", null);
CreateRequestSessionMiddleware = tslib_1.__decorate([
    common_1.Middleware()
], CreateRequestSessionMiddleware);
exports.CreateRequestSessionMiddleware = CreateRequestSessionMiddleware;
//# sourceMappingURL=CreateRequestSession.js.map