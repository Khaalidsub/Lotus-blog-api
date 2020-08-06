import {Property} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";
import {IModel} from "../services/interfaces";

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
}
