export interface IService<T> {
  add(obj: T): any;
  find(query: any): any;
  findById(id: String): any;
  set(obj: T): any;
  delete(id: String): Promise<boolean>;
}
