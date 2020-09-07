import {BodyParams, Req, Session, $log, Use, ConverterService, Inject} from "@tsed/common";
import {OnInstall, OnVerify, Protocol, PassportSerializerService, UserInfo} from "@tsed/passport";
import {IStrategyOptions, Strategy, VerifyFunctionWithRequest, IVerifyOptions} from "passport-local";
import passport from "passport";
import {UserService} from "../services/UserService";
import {ICredential} from "../models/ICredential";
import {response} from "express";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
    session: true,
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
    return user;
  }

  $onInstall(strategy: Strategy): void {
    // $log.info("strategory", strategy);
    // intercept the strategy instance to adding extra configuration
  }
}
