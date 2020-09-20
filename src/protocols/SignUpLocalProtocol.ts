import {BodyParams, $log, Inject} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy, IStrategyOptions} from "passport-local";
import {Forbidden} from "@tsed/exceptions";
import {UserService} from "../services/UserService";
import {User} from "../models/User";
import {sign} from "jsonwebtoken";
import {hash} from "bcrypt";
const saltRounds = 10;
@Protocol<IStrategyOptions>({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
    session: false,
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
      const password = await hash(user.password, saltRounds);
      user.password = password;
      const newUser = await this.usersService.add(user);
      if (!newUser) {
        return false;
      }

      //  await this.usersService.findOne(user.email);
      const token = sign(newUser.id, "app");
      $log.info("this is token", token);
      return token;
    } catch (error) {
      $log.error(error);
    }
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
