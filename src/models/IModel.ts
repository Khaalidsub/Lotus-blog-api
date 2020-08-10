import {$log} from "@tsed/common";

export interface IModel {
  _id: String;
}

export function autoPopulateAllFields(schema: any) {
  var paths = "";
  // $log.info("YOOO", schema);
  //checks every schema field path
  schema.eachPath(function process(pathname: any, schemaType: any) {
    //if path is the id of the document, no need to check
    if (pathname == "_id") return;
    //if the field path has an option "ref", add it in the paths
    if (schemaType.options.ref) paths += " " + pathname;
  });

  schema.pre("find", handler);
  schema.pre("findOne", handler);
  schema.pre("findById", handler);
  //acts like a loop, it will populate all the field paths that have the option "ref"
  function handler(next: any) {
    this.populate(paths);
    next();
  }
}
