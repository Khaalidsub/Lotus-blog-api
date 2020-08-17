"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: "default",
    url: process.env.DEFAULT_URL || "mongodb://172.17.0.2:27017/default",
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
//# sourceMappingURL=default.config.js.map