import {Controller, Inject} from "@tsed/common";
import {Category} from "../models/Category";
import {CategoryService} from "../services/CategoryService";

@Controller("/category")
export class CategoryController {
  constructor(@Inject(Category) service: CategoryService) {}
}
