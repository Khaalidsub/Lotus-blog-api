const Key_ID = process.env.KEY;
const Access_Key = process.env.ACCESS;
import {S3} from "aws-sdk";

export const s3 = new S3({
  region: "ap-southeast-1",
  accessKeyId: Key_ID,
  secretAccessKey: Access_Key,
});
