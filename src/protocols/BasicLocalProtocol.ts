import {Req, $log, Session} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy, session} from "passport";
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

  async $onVerify(@Session() session: Express.Session) {
    $log.info("here in basic protocol", session);
    if (!session.user) {
      return false;
    } else return true;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
