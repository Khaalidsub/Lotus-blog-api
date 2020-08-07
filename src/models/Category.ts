import {Model, Ref, ObjectID} from "@tsed/mongoose";
import {Property} from "@tsed/common";
import {Post} from "./Post";
import {IModel} from "./IModel";

@Model()
export class Category implements IModel {
  @ObjectID("id")
  _id: string;
  @Property()
  name: string;
  @Ref(Post)
  ref: Ref<Post>;
}
