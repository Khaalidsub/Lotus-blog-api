import {Controller, Inject, Post, Req, $log, Get, PathParams, Patch} from "@tsed/common";
import {UserService} from "../services/UserService";
import {Authenticate, Authorize} from "@tsed/passport";
import {User} from "../models/User";
import {PostService} from "../services/PostService";
import {Post as Posts} from "../models/Post";
import {log} from "console";
// export const tempId = "5f549bc077ff7458309f1b5c";
@Controller("")
export class UserController {
  constructor(@Inject(UserService) public userService: UserService, @Inject(PostService) private service: PostService) {}

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
  @Authorize("jwt")
  async getSession(@Req("account") req: User) {
    try {
      // const user = req.user || {id: null};
      // $log.info(req.session);
      // return user;
      // const user = await this.userService.findById(tempId);
      // $log.info("session", req);
      req.password = "";
      return req;
    } catch (error) {
      $log.error(error);
      return null;
    }
  }
  @Get("/user/:id")
  async getUser(@PathParams("id") id: String) {
    try {
      const user = await this.userService.findById(id);

      return user;
    } catch (error) {
      $log.error(error);
      return null;
    }
  }

  @Patch("/bookmark/:id")
  @Authorize("jwt")
  async toggleBookMark(@PathParams("id") id: string, @Req("account") req: User) {
    let updatedPost: string[];

    const foundPost = await this.service.findById(id);

    if (!foundPost) {
      return null;
    }
    const result = req.bookMarkedPosts?.find((postId) => postId.toString() === id.toString());

    if (result) {
      updatedPost = req.bookMarkedPosts?.filter((postId) => postId.toString() !== id.toString()) || [];
      req.bookMarkedPosts = updatedPost;

      foundPost.bookMarks = (foundPost.bookMarks as number) - 1;
    } else {
      updatedPost = req.bookMarkedPosts?.concat(id.toString()) || [id.toString()];
      req.bookMarkedPosts = updatedPost;
      foundPost.bookMarks = (foundPost.bookMarks as number) + 1;
    }
    $log.info(foundPost);
    await this.userService.set(req);
    await this.service.set(foundPost);
    return foundPost;
  }

  @Patch("/like/:id")
  @Authorize("jwt")
  async toggleLike(@PathParams("id") id: string, @Req("account") req: User) {
    let updatedPost: string[];

    const foundPost = await this.service.findById(id);
    if (!foundPost) {
      return;
    }
    const result = req.likedPosts?.find((postId) => postId.toString() === id.toString());

    if (result) {
      updatedPost = req.likedPosts?.filter((postId) => postId.toString() !== id.toString()) || [];
      req.likedPosts = updatedPost;

      foundPost.likes = (foundPost.likes as number) - 1;
    } else {
      updatedPost = req.likedPosts?.concat(id.toString()) || [id.toString()];
      req.likedPosts = updatedPost;
      foundPost.likes = (foundPost.likes as number) + 1;
    }

    await this.userService.set(req);
    await this.service.set(foundPost);
    return foundPost;
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
