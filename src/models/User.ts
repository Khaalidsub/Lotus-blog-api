import {Property, Default} from "@tsed/common";
import {Model, MongoosePlugin, ObjectID} from "@tsed/mongoose";
import {IModel} from "./IModel";
import {compare} from "bcrypt";
import {autoPopulateAllFields} from "mongoose-autopopulator";
@Model()
@MongoosePlugin(autoPopulateAllFields)
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
  @Property()
  // @Ref(Post)
  @Default([])
  likedPosts?: string[];
  @Property()
  // @Ref(Post)
  @Default([])
  bookMarkedPosts?: string[];
  async verifyPassword(password: string) {
    return compare(password, this.password);
  }
}
