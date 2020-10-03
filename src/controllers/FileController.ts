import {$log, Controller, Delete, PathParams, Post, Req} from "@tsed/common";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {rename as ren, readFileSync} from "fs";
import {s3} from "../config/aws";
import {promisify} from "util";
import {bucket} from "../config/firebase";
import {Authorize} from "@tsed/passport";
import {User} from "../models/User";

const rename = promisify(ren);
// const uploadFile = promisify(capella.uploadFile);
@Controller("/file")
export class UploadController {
  @Post("/upload")
  @Authorize("jwt")
  @MulterOptions({dest: `${process.cwd()}/images`})
  async add(@MultipartFile() file: Express.Multer.File, @Req("account") req: User): Promise<any> {
    // $log.info("in adding an image", file);
    // rename(file.path,'')
    const pos = file.path.lastIndexOf(".");
    const showFile =
      file.path.substr(0, pos < 0 ? file.path.length : pos) +
      file.originalname.substr(file.originalname.lastIndexOf("."), file.originalname.length);

    await rename(file.path, `${process.cwd()}/images/${file.filename}.jpg`);
    const fileContent = readFileSync(showFile);
    const fileUpload = `${req.email}/${file.originalname}`;

    // const params = {
    //   Bucket: "lotus-blogs",
    //   Key: fileUpload,
    //   Body: fileContent,
    //   ACL: "public-read",
    //   contentType: file.mimetype,
    // };
    //!needs to fix and rename this,after this think why iti was not working
    $log.info("file uploaded", showFile, fileContent);
    const result = await bucket.upload(showFile, {contentType: file.mimetype, public: true});
    // const result = await s3.upload(params).promise();

    return {
      success: 1,
      file: {
        url: result[0].baseUrl,
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
