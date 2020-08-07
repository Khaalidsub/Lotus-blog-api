import {Controller, Get, Post, Inject, PathParams, BodyParams, Delete} from "@tsed/common";
import {Post as Posts} from "../models/Post";
import {PostService} from "../services/PostService";

@Controller("/posts")
export class PostController {
  constructor(@Inject(PostService) private service: PostService) {}
  @Get()
  async getAll() {
    const posts = await this.service.find({});
    return posts;
  }
  @Get("/post/:id")
  async get(@PathParams("id") id: String) {
    const post = await this.service.findById(id);
    return post;
  }

  @Post()
  async add(@BodyParams("post") post: Posts) {
    const newPost = await this.service.add(post);
    return newPost;
  }
  @Delete("/post/:id")
  async delete(@PathParams("id") id: String) {
    const response = await this.service.delete(id);
    return response;
  }
}
