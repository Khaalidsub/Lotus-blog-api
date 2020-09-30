import {$log, Controller, Delete, PathParams, Post} from "@tsed/common";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {rename as ren, readFileSync} from "fs";
import {s3} from "../config/aws";
import {promisify} from "util";
import {S3} from "aws-sdk";
import {log} from "console";
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
      Bucket: "lotus-blogs",
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
  @Delete("/delete/:name")
  async delete(@PathParams("name") name: string): Promise<any> {
    const params = {
      Bucket: "blog",
      Key: name,
    };
    try {
      const result = await s3.deleteObject(params).promise();

      return result.DeleteMarker;
    } catch (error) {
      $log.error(error);

      return error;
    }

    // $log.info("file", result);
  }
}
