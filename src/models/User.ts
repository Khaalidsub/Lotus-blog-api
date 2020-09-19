import {Property, IgnoreProperty, Default} from "@tsed/common";
import {Model, MongoosePlugin, ObjectID, Ref} from "@tsed/mongoose";
import {autoPopulateAllFields, IModel} from "./IModel";
import {Post} from "./Post";

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
  verifyPassword(password: string) {
    return this.password === password;
  }
}
