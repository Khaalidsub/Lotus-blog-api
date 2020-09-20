const Key_ID = "AKIAI7KJ3RE27L4TQDZQ";
const Access_Key = "tFbESXj0YNz0sCkVIp2IzyqINlooojeQoDFB5+Wk";
import {S3} from "aws-sdk";

export const s3 = new S3({
  region: "ap-southeast-1",
  accessKeyId: Key_ID,
  secretAccessKey: Access_Key,
});
