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
import mongoConnection from "./config/mongoose/default.config";
import * as mongoose from "mongoose";
import * as session from "express-session";
import * as Mongo from "connect-mongo";
const MongoStore = Mongo(session);

import {User} from "./models/User";
import {CreateRequestSessionMiddleware} from "./middlewares/CreateRequestSession";

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
    "/rest": [`${rootDir}/controllers/**/*.ts`],
  },
  passport: {
    userInfoModel: User,
  },
  mongoose: mongooseConfig,
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit() {
    mongoose.connect(mongoConnection.url, mongoConnection.connectionOptions);
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      )

      .use(
        session({
          secret: "chocoLate",
          resave: true,
          saveUninitialized: true,
          store: new MongoStore({mongooseConnection: mongoose.connection}),
          cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: 36000 * 60 * 24,
          },
        })
      );
    this.app.use(CreateRequestSessionMiddleware);
    return null;
  }
}
