import fs from "fs";
import gm from "gm";
import fileType from "file-type";
import path from "path";
import sharp from "sharp";
/*
 * Check that given file is not harmful
 */
export const checkFile = async (dirname, files, user) => {
    const filePath = `${dirname}${process.env.FILE_PATH}${user.username}`;
    let duplicate = 0;
    const file =  files.image;

    if (!user) {
      throw new Error("User not found");
    }
  
    if (!fs.existsSync(`${filePath}`)) {
      fs.mkdirSync(`${filePath}`);
    }
  
    const items = fs.readdirSync(filePath);
  
    for (let item of items) {
      if (item.slice(10) === file.name.replace(/ /g, "")) {
        duplicate += 1;
      }
    }
  
    if (duplicate >= 100) {
      throw new Error("Forbidden");
    }
  
    const { size } = file;
  
    // 2mb
    if (size > 2000000) {
      return "Too large file";
    }
  
    // read file
    const buffer = await fs.readFileSync(file.path);
  
    // determine file type using magic numbers
    const ft = fileType(buffer);
  
    if (!ft) {
      return "Invalid file";
    }
  
    const { mime } = ft;
  
    if (
      ![
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf"
      ].includes(mime)
    ) {
      return "Invalid file";
    }
  
    return "ok";
  };

  export const uploadfile = async (files, dirname, resize, user) => {
    const filePath = `${dirname}${process.env.FILE_PATH}`;

    const file = files.image;

    const fileName = `${Math.floor(
      100000000 + Math.random() * 900000000
    )}_${ file.name.replace(/ /g, "") }`;
  
    const fileBuffer = await fs.readFileSync(file.path);
  
    await fs.writeFileSync(
      `${filePath}${user.username}/${fileName}`,
      fileBuffer,
      "binary"
    );
  
    if (Object.keys(resize).length > 0) {
      const { width, height } = resize;
  
      return resizeImage(fileName, filePath, width, height);
    }
  
    const crops = [
      { width: 280, height: 460 },
      { width: 315, height: 220 },
      { width: 620, height: 300 }
    ];
  
    let JPEGImages = [];
    let PNGImages = [];
  
    for (let crop of crops) {
      sharp(fileBuffer)
        .resize(Number(crop.width), Number(crop.height))
        .toFile(
          `${filePath}thumb/${crop.width}_${crop.height}_${fileName}`,
          (err, info) => {
            if (err) console.log("error :::", err);
          }
        );
  
      const fileFormat = path.extname(fileName);
  
      if (fileFormat == ".jpeg" || fileFormat == ".jpg") {
        JPEGImages.push(
          `${filePath}thumb/${crop.width}_${crop.height}_${fileName}`
        );
      }
  
      if (fileFormat == ".png") {
        PNGImages.push(
          `${filePath}thumb/${crop.width}_${crop.height}_${fileName}`
        );
      }
    }
  
    // await optimiseJPEGImages(JPEGImages, filePath);
    // await optimisePNGImages(PNGImages, filePath);
   
    if (process.env.NODE_ENV !== "production")
      return {
        path: `${process.env.DOMAIN}/static/${user.username}/${fileName}`
      };
  
    return {
      path: `${process.env.DOMAIN}/api/static/${user.username}/${fileName}`
    };
  };

  export const resizeImage = async (
    fileName,
    filePath,
    width = 640,
    height = 360
  ) => {
    const imageMagick = gm.subClass({ imageMagick: true });
  
    const fileBuffer = await fs.readFileSync(`${filePath}/${fileName}`, err => {
      if (err) {
        throw new Error("Image not found");
      }
    });
  
    imageMagick(fileBuffer)
      .resize(width, height, "^")
      .gravity("Center")
      .noProfile()
      .autoOrient()
      .write(`${filePath}thumb/${width}_${height}_${fileName}`, err => {
        if (err) {
          console.log(err);
        }
      });
  
    return {
      path: `${
        process.env.DOMAIN
      }/api/static/thumb/${width}_${height}_${fileName}`
    };
  };