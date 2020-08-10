import {BodyParams, Req, $log, Session} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy} from "passport-local";
import {Forbidden} from "@tsed/exceptions";
import {UserService} from "../services/UserService";
import {User} from "../models/User";
import {session} from "passport";

@Protocol({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
  },
})
export class SignupLocalProtocol implements OnVerify, OnInstall {
  constructor(private usersService: UserService) {}

  async $onVerify(@Req() request: Req, @BodyParams() user: User, @Session() session: Express.Session) {
    try {
      $log.info("here in protocol", user);
      const {email} = user;
      const found = await this.usersService.findOne({email});

      if (found) {
        throw new Forbidden("Email is already registered");
      }

      const foundUser = await this.usersService.add(user);
      if (foundUser) session.user = foundUser;
      //  await this.usersService.findOne(user.email);
      return foundUser;
    } catch (error) {
      $log.error(error);
    }
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
