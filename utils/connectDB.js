import mongoose from "mongoose";

import { MONGO_URI } from "./var.js";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_URI);
  console.log("ConnectDB");
};

export default connectDB;
