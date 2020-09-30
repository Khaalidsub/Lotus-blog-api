"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const Key_ID = process.env.KEY;
const Access_Key = process.env.ACCESS;
const aws_sdk_1 = require("aws-sdk");
exports.s3 = new aws_sdk_1.S3({
    region: "ap-southeast-1",
    accessKeyId: Key_ID,
    secretAccessKey: Access_Key,
});
//# sourceMappingURL=aws.js.map