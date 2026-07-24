import mongoose from "mongoose";
import "dotenv/config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/FreshKart`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;