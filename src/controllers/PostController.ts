import {Controller, Get, Post, Inject, $log} from "@tsed/common";
import {Post as Posts} from "../models/Post";
import {PostService} from "../services/PostService";

@Controller("/posts")
export class PostController {
  constructor(@Inject(PostService) private service: PostService) {}
  @Get()
  async get() {
    let post = new Posts();
    post.body = "hello";
    post.title = "hello";

    this.service.save(post);
  }

  @Post()
  async add() {
    $log.info("here i am");
  }
}
