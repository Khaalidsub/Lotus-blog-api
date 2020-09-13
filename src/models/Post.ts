import {Property, Default, IgnoreProperty} from "@tsed/common";
import {Model, ObjectID, Ref, MongoosePlugin} from "@tsed/mongoose";
import {Category} from "./Category";
import {User} from "./User";
import {IModel, autoPopulateAllFields} from "./IModel";

@Model()
@MongoosePlugin(autoPopulateAllFields)
export class Post implements IModel {
  @ObjectID("id")
  _id: string;
  @Property()
  title: string;
  @Property()
  subtitle: string;
  @Property()
  blocks: [];
  @Property()
  @Default(Date.now)
  createdAt?: Date;
  @Property()
  @Default("")
  image?: string;
  @Property()
  likedPosts?: Ref<Post[]>;
  @Property()
  bookMarkedPosts?: Ref<Post[]>;
  @Ref(Category)
  category: Ref<Category>;
  @Ref(User)
  user: Ref<User>;
}
