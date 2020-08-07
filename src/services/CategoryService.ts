import {Service, Inject} from "@tsed/di";
import {$log} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Category} from "../models/Category";
import {GenericService} from "./GenericService";

@Service()
export class CategoryService extends GenericService<Category> {
  constructor(@Inject(Category) public model: MongooseModel<Category>) {
    super(model);
    $log.info(model);
  }
}
