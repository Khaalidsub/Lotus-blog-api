import {Controller, Inject, Delete, Post, Get, PathParams, BodyParams} from "@tsed/common";
import {Category} from "../models/Category";
import {CategoryService} from "../services/CategoryService";

@Controller("/categories")
export class CategoryController {
  constructor(@Inject(CategoryService) private service: CategoryService) {}
  @Get()
  async getAll() {
    const posts = await this.service.find({});
    return posts;
  }
  @Get("/category/:id")
  async get(@PathParams("id") id: String) {
    const category = await this.service.findById(id);
    return category;
  }

  @Post()
  async add(@BodyParams() category: Category) {
    const newPost = await this.service.add(category);
    return newPost;
  }
  @Delete("/category/:id")
  async delete(@PathParams("id") id: String) {
    const response = await this.service.delete(id);
    return response;
  }
}
