import { connect } from './config/connection';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import apiRoutes from "./routes";
import middlewareConfig from './config/middlewares';

dotenv.config();

connect();

const { PORT } = process.env;

const app = express();

middlewareConfig(app);

const httpServer = createServer(app);
app.use("/api", apiRoutes);


httpServer.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`API server is now running on ${PORT}`);
  }
});
module.exports = app;
