import {BodyParams, Req, Session, $log} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {IStrategyOptions, Strategy} from "passport-local";
import {UserService} from "../services/UserService";
import {ICredential} from "../models/ICredential";
import {User} from "../models/User";
import {use} from "passport";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
  },
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(private usersService: UserService) {}

  async $onVerify(@Req() request: Req, @BodyParams() credentials: ICredential, @Session("user") sessionUser: User) {
    const {email, password} = credentials;

    const user = await this.usersService.findOne({email});

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    if (!user.verifyPassword(password)) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }
    sessionUser = user;
    $log.info("logged:", sessionUser);
    return user;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
