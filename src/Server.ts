import {Configuration, Inject} from "@tsed/di";
import {$log, PlatformApplication} from "@tsed/common";
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
import {User} from "./models/User";

export const rootDir = __dirname;

@Configuration({
  rootDir,
  statics: {
    "/images": [
      {
        root: `${process.env.IMAGEDIR || rootDir}/`,

        // cacheControl: true,
        extensions: [".jpg", ".png"],

        setHeaders: (res, path, stat) => {
          $log.info("in checking for images", path);

          res.sendFile(path);
        },
        // ... statics options
      },
    ],
  },
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,

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
    this.app.raw.set("trust proxy", 1);
    this.app
      .use(
        cors({
          credentials: true,
          origin: [
            "https://www.lotus-blogs.com",
            "http://localhost:3000",
            "https://lotus-blogs.com",
            "https://www.focused-borg-7fa9ff.netlify.app",
          ],
          maxAge: 36000 * 60 * 24,
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

    return null;
  }
}
