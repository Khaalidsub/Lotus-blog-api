import {Service, Inject} from "@tsed/di";
import {$log} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Post} from "../models/Post";
import {GenericService} from "./GenericService";

@Service()
export class PostService extends GenericService<Post> {
  constructor(@Inject(Post) public model: MongooseModel<Post>) {
    super(model);
    $log.info(model);
  }
}
