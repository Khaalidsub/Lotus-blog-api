import {Service, Inject} from "@tsed/di";
import {$log} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {IModel} from "./interfaces";

@Service()
export class TemplateService<T extends IModel> {
  constructor(@Inject() private model: MongooseModel<T>) {
    $log.info(model);
  }
  async save(obj: T): Promise<any> {
    const doc = new this.model(obj);
    await doc.save();
    return doc;
  }

  async find(query: any) {
    const list = await this.model.find(query).exec();

    $log.info(list);
    return list;
  }
  async findById(id: String) {
    const doc = await this.model.findById(id);
    return doc;
  }
  async set(obj: T) {
    const prevDoc = await this.findById(obj._id);
    const updateDoc = await prevDoc?.update(obj);
    $log.info(updateDoc);
    return updateDoc;
  }
}
