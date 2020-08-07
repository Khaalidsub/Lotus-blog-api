import {Property} from "@tsed/common";
import {Model, ObjectID, VirtualRef} from "@tsed/mongoose";
import {Category} from "./Category";
import {User} from "./User";

@Model()
export class Post {
  @ObjectID("id")
  _id: string;
  @Property()
  title: string;
  @Property()
  subtitle: string;
  @Property()
  body: string;
  @Property()
  createdAt: Date;
  @Property()
  updatedAt: Date;
  @VirtualRef("Category")
  category: VirtualRef<Category>;
  @VirtualRef("User")
  user: VirtualRef<User>;
}
