import {Property, IgnoreProperty} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";
import {IModel} from "./IModel";

@Model()
export class User implements IModel {
  @ObjectID("id")
  _id: string;
  @Property()
  name: string;
  @Property()
  email: string;
  @IgnoreProperty()
  password: string;
  verifyPassword(password: string) {
    return this.password === password;
  }
}
