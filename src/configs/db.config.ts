import mongoose, { CallbackError } from "mongoose";

export const connect = () => {

  const uri: string = process.env.MONGO_URI || "mongodb://localhost:27017/";

  mongoose.connect(uri, {})
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error: CallbackError) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}