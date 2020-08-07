import {Model, Ref, ObjectID} from "@tsed/mongoose";
import {Property} from "@tsed/common";
import {Post} from "./Post";

@Model()
export class Category {
  @ObjectID("id")
  _id: string;
  @Property()
  name: string;
  @Ref(Post)
  ref: Ref<Post>;
}
