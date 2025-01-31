import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_URL = "" } = process.env;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connection
  .on("connected", () => {
    console.log(`Connected to the database: ${MONGO_URL}`);
  })
  .on("disconnected", () => {
    console.log(`Disconnected from the database: ${MONGO_URL}`);
  })
  .on("error", error => {
    console.log(`Database connection error: ${MONGO_URL}`, error);
  });

export function connect() {
  return mongoose.connect(
    MONGO_URL,
    { 
      useCreateIndex: true,
      useNewUrlParser: true 
    }
  );
}

export function disconnect() {
  return mongoose.connection.close();
}
