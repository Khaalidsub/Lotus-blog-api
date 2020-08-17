"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const exceptions_1 = require("@tsed/exceptions");
const REG_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function checkEmail(email) {
    if (!(email && REG_EMAIL.test(email))) {
        throw new exceptions_1.BadRequest("Email is invalid");
    }
}
exports.checkEmail = checkEmail;
//# sourceMappingURL=checkers.js.map