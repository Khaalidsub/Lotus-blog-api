"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoPopulateAllFields = void 0;
function autoPopulateAllFields(schema) {
    var paths = "";
    // $log.info("YOOO", schema);
    //checks every schema field path
    schema.eachPath(function process(pathname, schemaType) {
        //if path is the id of the document, no need to check
        if (pathname == "_id")
            return;
        //if the field path has an option "ref", add it in the paths
        if (schemaType.options.ref)
            paths += " " + pathname;
    });
    schema.pre("find", handler);
    schema.pre("findOne", handler);
    schema.pre("findById", handler);
    //acts like a loop, it will populate all the field paths that have the option "ref"
    //TODO : fix the password for users
    function handler(next) {
        this.populate(paths);
        next();
    }
}
exports.autoPopulateAllFields = autoPopulateAllFields;
//# sourceMappingURL=IModel.js.map