import {Service, Inject} from "@tsed/di";
import {$log} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {User} from "../models/User";
import {GenericService} from "./GenericService";

@Service()
export class UserService extends GenericService<User> {
  constructor(@Inject(User) public model: MongooseModel<User>) {
    super(model);
    $log.info(model);
  }
  async findOne(email: any) {
    try {
      return this.model.findOne(email);
    } catch (error) {
      $log.error(error);
      return null;
    }
  }
}
