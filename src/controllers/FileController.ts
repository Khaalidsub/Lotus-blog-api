import {$log, Controller, Post} from "@tsed/common";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {rename as ren, readFileSync} from "fs";
import {s3} from "../config/aws";
import {promisify} from "util";
const rename = promisify(ren);
// const uploadFile = promisify(capella.uploadFile);
@Controller("/file")
export class UploadController {
  @Post("/upload")
  @MulterOptions({dest: `${process.cwd()}/images`})
  async add(@MultipartFile() file: Express.Multer.File): Promise<any> {
    // $log.info("in adding an image", file);
    // rename(file.path,'')
    const pos = file.path.lastIndexOf(".");
    const showFile =
      file.path.substr(0, pos < 0 ? file.path.length : pos) +
      file.originalname.substr(file.originalname.lastIndexOf("."), file.originalname.length);

    await rename(file.path, `${process.cwd()}/images/${file.filename}.jpg`);
    const fileContent = readFileSync(showFile);
    const fileUpload = `posts/${file.originalname}`;

    const params = {
      Bucket: "campus-blog",
      Key: fileUpload,
      Body: fileContent,
      ACL: "public-read",
      contentType: file.mimetype,
    };
    const result = await s3.upload(params).promise();
    // $log.info("file", result);

    return {
      success: 1,
      file: {
        url: result.Location,
      },
    };
  }
}