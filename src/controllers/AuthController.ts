import {Controller, Inject} from "@tsed/common";
import {UserService} from "../services/UserService";

@Controller("/auth")
export class UserController {
  constructor(@Inject(UserService) userService: UserService) {}
}
