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
  },
})
export class JwtProtocol implements OnVerify {
  constructor(@Inject(UserService) public usersService: UserService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.usersService.findOne({_id: jwtPayload});

    return user ? user : false;
  }
}
