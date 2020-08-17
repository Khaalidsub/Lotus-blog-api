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
  body: string;
  // @IgnoreProperty()
  // @Default(Date.now)
  // createdAt: Date = new Date();
  // @IgnoreProperty()
  // @Default(Date.now)
  // updatedAt: Date = new Date();
  @Ref(Category)
  category: Ref<Category>;
  @Ref(User)
  user: Ref<User>;
}
