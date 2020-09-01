import {Property, IgnoreProperty, Default} from "@tsed/common";
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
  @Property()
  password: string;
  @Property()
  @Default("")
  image?: string;
  verifyPassword(password: string) {
    return this.password === password;
  }
}
