import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

export const init = async app => {
  const makeDirs = () => {
    const dirStatic = `${__dirname}/static`;
    const dirMedia = `${__dirname}/static/media`;
    const dirThumb = `${__dirname}/static/media/thumb`;

    const dirPrivate = `${__dirname}/static/media/private`;
    const dirXls = `${__dirname}/static/media/private/xlsTemplateOutputs`;

    if (
      !fs.existsSync(dirStatic) ||
      !fs.existsSync(dirMedia) ||
      !fs.existsSync(dirThumb)
    ) {
      fs.mkdirSync(dirStatic);
      fs.mkdirSync(dirMedia);
      fs.mkdirSync(dirThumb);
    }

    if (!fs.existsSync(dirPrivate) || !fs.existsSync(dirXls)) {
      fs.mkdirSync(dirPrivate);
      fs.mkdirSync(dirXls);
    }
  };

  makeDirs();
};
