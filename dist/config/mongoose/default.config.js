"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: "default",
    url: process.env.DEFAULT_URL || "mongodb://localhost:27017/default",
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
//# sourceMappingURL=default.config.js.map