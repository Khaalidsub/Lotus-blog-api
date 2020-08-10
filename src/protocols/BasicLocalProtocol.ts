import {Req, $log} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy} from "passport";
import {BasicStrategy} from "passport-http";
import {UserService} from "../services/UserService";
import {User} from "../models/User";

@Protocol({
  name: "basic",
  useStrategy: BasicStrategy,
  settings: {},
})
export class BasicProtocol implements OnVerify, OnInstall {
  constructor(private usersService: UserService) {}

  async $onVerify(@Req("user") user: User) {
    $log.info("here in basic protocol", user);
    if (!user) {
      return false;
    } else return true;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
