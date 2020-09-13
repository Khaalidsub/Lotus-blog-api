import {BodyParams, Req, $log, Inject} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {IStrategyOptions, Strategy} from "passport-local";
import {UserService} from "../services/UserService";
import {ICredential} from "../models/ICredential";
import {sign} from "jsonwebtoken";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
    session: false,
  },
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(@Inject(UserService) public usersService: UserService) {}

  async $onVerify(@Req() request: Req, @BodyParams() credentials: ICredential) {
    const {email, password} = credentials;
    $log.info(request.headers, request.headers.cookie);
    // const value = new Passport()
    const user = await this.usersService.findOne({email});

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }
    // response.cookie =

    if (!user.verifyPassword(password)) {
      // OR throw new NotAuthorized("Wrong credentials")
      return false;
    }

    $log.info("logged:", user);
    // sessionUser = user;

    const token = sign(user.id, "app");
    $log.info("this is token", token);
    return token;
  }

  $onInstall(strategy: Strategy): void {
    // $log.info("strategory", strategy);
    // intercept the strategy instance to adding extra configuration
  }
}
