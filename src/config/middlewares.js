import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import formidable from 'formidable';
import compression from "compression";
import helmet from "helmet";
import morgan from 'morgan';
import passport from "passport";
import { uploadfile, checkFile } from '../utils/utils';
import expressWinston from 'express-winston';
import winstonInstance from '../utils/winston';

export default app => {

  const isDev = process.env.NODE_ENV === 'development';
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(passport.initialize())
  app.use(helmet());
  app.use(cors());
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  if (isDev) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg:
          'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true,
      }),
    );
  }
  //app.use('../static', express.static(path.join(__dirname, '../static/media')));
  //app.use("/api/v1/uploads", express.static("uploads"));
}