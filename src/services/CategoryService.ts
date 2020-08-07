import {Service, Inject} from "@tsed/di";
import {$log} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Category} from "../models/Category";

@Service()
export class CategoryService {
  constructor(@Inject(Category) private model: MongooseModel<Category>) {
    $log.info(model);
  }
  async save(obj: Category): Promise<any> {
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
  async set(obj: Category) {
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
