import {Property} from "@tsed/common";
import {Model, ObjectID, Ref} from "@tsed/mongoose";
import {Post} from "./Post";

@Model()
export class User {
  @ObjectID("id")
  _id: string;

  @Property()
  name: string;
  @Property()
  email: string;
  @Property()
  password: string;
  @Ref(Post)
  ref: Ref<Post>;
}
