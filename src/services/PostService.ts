import {Service, Inject} from "@tsed/di";
import {$log} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Post} from "../models/Post";

@Service()
export class PostService {
  constructor(@Inject(Post) private model: MongooseModel<Post>) {
    $log.info(model);
  }
  async save(obj: Post): Promise<any> {
    try {
      const doc = new this.model(obj);
      await doc.save();
      return doc;
    } catch (error) {
      $log.error(error);
    }
  }

  async find(query: any) {
    try {
      const list = await this.model.find(query).exec();
      $log.info(list);
      return list;
    } catch (error) {
      $log.error(error);
    }
  }
  async findById(id: String) {
    try {
      const doc = await this.model.findById(id);
      return doc;
    } catch (error) {
      $log.error(error);
    }
  }
  async set(obj: Post) {
    try {
      const prevDoc = await this.findById(obj._id);
      const updateDoc = await prevDoc?.update(obj);
      $log.info(updateDoc);
      return updateDoc;
    } catch (error) {
      $log.error(error);
    }
  }
}
