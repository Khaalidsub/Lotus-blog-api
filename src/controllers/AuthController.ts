import {Controller, Inject, Post, Req, BodyParams, $log, Status, Put, Get, Session} from "@tsed/common";
import {UserService} from "../services/UserService";
import {Authenticate, Authorize} from "@tsed/passport";
import {User} from "../models/User";
import {ICredential} from "../models/ICredential";

@Controller("")
export class UserController {
  constructor(@Inject(UserService) public userService: UserService) {}

  @Post("/login")
  @Authenticate("login")
  async login(@Req() req: Req, @BodyParams() credential: ICredential, @Session("user") user: any) {
    const response = await this.userService.find({email: credential.email});
    user = response;
    $log.info("here in auth", req);
  }

  @Post("/signup")
  @Authenticate("signup")
  signUp(@Req() req: Req, @BodyParams() user: User) {
    try {
    } catch (error) {
      $log.error(error);
    }
  }
  @Get("/session")
  // @Authorize("basic")
  getSession(@Session() session: any) {
    try {
      $log.info(session.user);
      return session;
    } catch (error) {
      $log.error(error);
    }
  }
  @Get("/logout")
  @Authorize("basic")
  logout(@Req("user") req: User) {
    try {
    } catch (error) {
      $log.error(error);
    }
  }
}
