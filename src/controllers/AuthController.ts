import {Controller, Inject, Post, Req, $log, Get} from "@tsed/common";
import {UserService} from "../services/UserService";
import {Authenticate, Authorize} from "@tsed/passport";
import {User} from "../models/User";

@Controller("")
export class UserController {
  constructor(@Inject(UserService) public userService: UserService) {}

  @Post("/login")
  @Authenticate("login")
  async login(@Req("user") req: User) {
    return req;
  }

  @Post("/signup")
  @Authenticate("signup")
  signUp(@Req("user") req: User) {
    try {
      // $log.info(req);
      return req;
    } catch (error) {
      $log.error(error);
    }
  }
  @Get("/session")
  // @Authorize("basic")
  getSession(@Req() req: Req) {
    try {
      const user = req.user || {id: null};
      $log.info(req.session);
      return user;
    } catch (error) {
      $log.error(error);
      return null;
    }
  }
  @Get("/logout")
  logout(@Req() req: Req) {
    try {
      req.logout();
      req.user = undefined;
      $log.info("logged out", req.session);
    } catch (error) {
      $log.error(error);
    }
  }
}
