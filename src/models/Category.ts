import {Model, ObjectID} from "@tsed/mongoose";
import {Property} from "@tsed/common";
import {IModel} from "./IModel";

@Model()
export class Category implements IModel {
  @ObjectID("id")
  _id: string;
  @Property()
  name: string;
}
