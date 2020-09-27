import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import {GlobalAcceptMimesMiddleware} from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import "@tsed/ajv";
import "@tsed/mongoose";
import mongooseConfig from "./config/mongoose";
import * as session from "express-session";
import * as Mongo from "connect-mongo";
const MongoStore = Mongo(session);
import {User} from "./models/User";

export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: true, // CHANGE

  componentsScan: [
    `${rootDir}/protocols/**/*.ts`,
    `${rootDir}/services/**/*.ts`,
    `${rootDir}/models/**/*.ts`,
    `${rootDir}/middlewares/**/*.ts`,
  ],
  mount: {
    "/blog": [`${rootDir}/controllers/**/*.ts`],
  },
  passport: {
    userInfoModel: User,
  },
  mongoose: mongooseConfig,
  multer: {},
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit() {
    // this.app.raw.set("trust proxy", 1);
    this.app
      .use(
        cors({
          // credentials: true,
          // origin: ["http://www.lotus-blogs.com", "https://www.lotus-blogs.com", "https://www.focused-borg-7fa9ff.netlify.app"],
          // maxAge: 36000 * 60 * 24,
        })
      )
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
    this.app.raw.use(
      session({
        resave: true,
        name: "app",
        // proxy: true,
        secret: "mysecretkey",
        saveUninitialized: false,
        store: new MongoStore({url: process.env.DEFAULT_URL || "mongodb://localhost:27017/default", ttl: 14 * 24 * 60 * 60}),
        cookie: {
          path: "/",
          httpOnly: false,

          secure: false,
          maxAge: 36000 * 60 * 24,
        },
      })
    );

    return null;
  }
}
