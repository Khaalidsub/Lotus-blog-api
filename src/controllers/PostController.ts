import {Controller, Get, Post, Inject, PathParams, BodyParams, Delete, $log, Req, Put} from "@tsed/common";
import {Post as Posts} from "../models/Post";
import {PostService} from "../services/PostService";
import {Authorize} from "@tsed/passport";
import {User} from "../models/User";

@Controller("/posts")
export class PostController {
  constructor(@Inject(PostService) private service: PostService) {}
  @Get()
  async getAll() {
    const posts = await this.service.find({});

    return posts;
  }
  //get posts of the logged  user
  @Get("/my-posts")
  @Authorize("basic")
  async getUserPosts(@Req("user") req: User) {
    $log.info("session", req);
    const posts = await this.service.find({user: req._id});

    return posts;
  }
  //get the posts of another user
  @Get("/user-posts/:id")
  async getProfilePosts(@PathParams("id") id: String) {
    const posts = await this.service.find({user: id});

    return posts;
  }
  @Get("/post/:id")
  async get(@PathParams("id") id: String) {
    const post = await this.service.findById(id);
    return post;
  }

  @Post()
  @Authorize("basic")
  async add(@BodyParams("post") post: Posts, @Req("user") req: User) {
    post.user = req._id;
    const newPost = await this.service.add(post);
    return newPost;
  }

  @Put("/update")
  @Authorize("basic")
  async updatePost(@BodyParams("post") post: Posts) {
    const updatePost = this.service.set(post);
    return updatePost;
  }
  @Delete("/post/:id")
  @Authorize("basic")
  async delete(@PathParams("id") id: String) {
    const response = await this.service.delete(id);
    return response;
  }
}
