import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to Database ${db.connection.name}`);
  } catch (error) {
    return console.log("Error connecting to Database.\n" + error);
  }
};

export { connectdb };
