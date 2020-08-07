import {Property, Format, Default} from "@tsed/common";
import {Model, ObjectID, VirtualRef} from "@tsed/mongoose";
import {Category} from "./Category";
import {User} from "./User";
import {IModel} from "./IModel";

@Model()
export class Post implements IModel {
  @ObjectID("id")
  _id: string;
  @Property()
  title: string;
  @Property()
  subtitle: string;
  @Property()
  body: string;
  @Format("date-time")
  @Default(Date.now)
  createdAt: Date = new Date();
  @Format("date-time")
  @Default(Date.now)
  updatedAt: Date = new Date();
  @VirtualRef("Category")
  category: VirtualRef<Category>;
  @VirtualRef("User")
  user: VirtualRef<User>;
}
