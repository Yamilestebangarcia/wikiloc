import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });
import mongoose from "mongoose";
const mongo_url = process.env.mongo_url;

mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
