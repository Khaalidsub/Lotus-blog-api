"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.rootDir = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const common_1 = require("@tsed/common");
require("@tsed/platform-express"); // /!\ keep this import
const platform_express_1 = require("@tsed/platform-express");
const bodyParser = require("body-parser");
const compress = require("compression");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
require("@tsed/ajv");
require("@tsed/mongoose");
const mongoose_1 = require("./config/mongoose");
const session = require("express-session");
const Mongo = require("connect-mongo");
const MongoStore = Mongo(session);
const User_1 = require("./models/User");
exports.rootDir = __dirname;
let Server = class Server {
    $beforeRoutesInit() {
        // this.app.raw.set("trust proxy", 1);
        this.app
            .use(cors({
            credentials: true,
            origin: ["http://www.lotus-blogs.com", "https://www.lotus-blogs.com", "https://www.focused-borg-7fa9ff.netlify.app"],
            maxAge: 36000 * 60 * 24,
        }))
            .use(platform_express_1.GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
            extended: true,
        }));
        this.app.raw.use(session({
            resave: true,
            name: "app",
            // proxy: true,
            secret: "mysecretkey",
            saveUninitialized: false,
            store: new MongoStore({ url: process.env.DEFAULT_URL || "mongodb://localhost:27017/default", ttl: 14 * 24 * 60 * 60 }),
            cookie: {
                path: "/",
                httpOnly: false,
                secure: false,
                maxAge: 36000 * 60 * 24,
            },
        }));
        return null;
    }
};
tslib_1.__decorate([
    di_1.Inject(),
    tslib_1.__metadata("design:type", common_1.PlatformApplication)
], Server.prototype, "app", void 0);
tslib_1.__decorate([
    di_1.Configuration(),
    tslib_1.__metadata("design:type", Object)
], Server.prototype, "settings", void 0);
Server = tslib_1.__decorate([
    di_1.Configuration({
        rootDir: exports.rootDir,
        acceptMimes: ["application/json"],
        httpPort: process.env.PORT || 8083,
        httpsPort: false,
        componentsScan: [
            `${exports.rootDir}/protocols/**/*.ts`,
            `${exports.rootDir}/services/**/*.ts`,
            `${exports.rootDir}/models/**/*.ts`,
            `${exports.rootDir}/middlewares/**/*.ts`,
        ],
        mount: {
            "/blog": [`${exports.rootDir}/controllers/**/*.ts`],
        },
        passport: {
            userInfoModel: User_1.User,
        },
        mongoose: mongoose_1.default,
        multer: {},
        exclude: ["**/*.spec.ts"],
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=Server.js.map