import {BodyParams, Req, $log, Session, Inject} from "@tsed/common";
import {OnInstall, OnVerify, Protocol, PassportMiddleware} from "@tsed/passport";
import {Strategy, IStrategyOptions} from "passport-local";
import {Forbidden} from "@tsed/exceptions";
import {UserService} from "../services/UserService";
import {User} from "../models/User";
import {session} from "passport";

@Protocol<IStrategyOptions>({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
    session: true,
  },
})
export class SignupLocalProtocol implements OnVerify, OnInstall {
  constructor(@Inject(UserService) public usersService: UserService) {}

  async $onVerify(@BodyParams() user: User) {
    try {
      // $log.info("here in protocol", user);
      const {email} = user;
      const found = await this.usersService.findOne({email});

      if (found) {
        throw new Forbidden("Email is already registered");
      }

      const newUser = await this.usersService.add(user);

      //  await this.usersService.findOne(user.email);
      return newUser;
    } catch (error) {
      $log.error(error);
    }
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
