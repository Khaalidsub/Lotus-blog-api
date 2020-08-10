import {Controller, Inject, Post, Req, BodyParams, $log, Status, Put} from "@tsed/common";
import {UserService} from "../services/UserService";
import {Authenticate} from "@tsed/passport";
import {User} from "../models/User";
import {ICredential} from "../models/ICredential";

@Controller("")
export class UserController {
  constructor(@Inject(UserService) userService: UserService) {}

  @Post("/login")
  @Authenticate("login")
  login(@Req() req: Req, @BodyParams() credential: ICredential) {
    $log.info("here in auth", req.user);
  }

  @Post("/signup")
  @Authenticate("signup")
  signUp(@Req() req: Req, @BodyParams() user: User) {
    try {
      $log.info("here in sign up", user);
    } catch (error) {
      $log.error(error);
    }
  }
}
