import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./db/dbconnect.js";
import { userRouter } from "./routes/user.route.js";
//middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json())
dotenv.config();

//connect to db
connectdb();

//api endpoints
app.use("/api/user", userRouter);

//http server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
