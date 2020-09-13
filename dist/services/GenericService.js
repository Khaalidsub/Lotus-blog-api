"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
class GenericService {
    constructor(model) {
        this.model = model;
    }
    add(obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                common_1.$log.info("info", obj);
                const doc = new this.model(obj);
                yield doc.save();
                return doc;
            }
            catch (error) {
                common_1.$log.error(error);
            }
        });
    }
    find(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield this.model.find(query).exec();
                return list;
            }
            catch (error) {
                common_1.$log.error(error);
            }
        });
    }
    findById(id, populate = "") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.findById(id).populate(populate);
                return doc;
            }
            catch (error) {
                common_1.$log.error(error);
            }
        });
    }
    set(obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const prevDoc = yield this.findById(obj._id);
                const updateDoc = yield (prevDoc === null || prevDoc === void 0 ? void 0 : prevDoc.updateOne(obj));
                common_1.$log.info(updateDoc);
                return updateDoc;
            }
            catch (error) {
                common_1.$log.error(error);
            }
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.findByIdAndDelete(id);
                return true;
            }
            catch (error) {
                common_1.$log.error(error);
                return false;
            }
        });
    }
}
exports.GenericService = GenericService;
//# sourceMappingURL=GenericService.js.map