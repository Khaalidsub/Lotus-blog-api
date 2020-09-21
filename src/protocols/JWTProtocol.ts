import {$log, Inject, Req} from "@tsed/common";
import {Arg, OnVerify, Protocol} from "@tsed/passport";
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";

import {UserService} from "../services/UserService";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "app",
    // issuer: "accounts.examplesoft.com",
    // audience: "yoursite.net"
  },
})
export class JwtProtocol implements OnVerify {
  constructor(@Inject(UserService) public usersService: UserService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    // $log.info("i am here", jwtPayload);
    const user = await this.usersService.findOne({_id: jwtPayload});
    // $log.info("found", user);
    // user?.password = undefined
    return user ? user : false;
  }
}
