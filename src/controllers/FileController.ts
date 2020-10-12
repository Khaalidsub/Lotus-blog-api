import {Controller, Post} from "@tsed/common";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {Authorize} from "@tsed/passport";
import {diskStorage} from "multer";

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
@Controller("/file")
export class UploadController {
  @Post("/upload")
  @Authorize("jwt")
  @MulterOptions({
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, process.env.IMAGEDIR || `/images`);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + ".jpg");
      },
    }),
    fileFilter: imageFilter,
    limits: {
      fieldSize: 10000 * 5000,
    },
  })
  async add(@MultipartFile() file: Express.Multer.File): Promise<any> {
    return {
      success: 1,
      file: {
        url: `https://www.lotus-blogs-api.xyz/images/${file.filename}`,
        // url: `http://10.100.25.59:8081/images/${file.filename}`,
      },
    };
  }
}
