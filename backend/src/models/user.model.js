import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    otp:{
      type: Number,
      default: Math.floor(Math.random() * 10000)
    }
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

export { User };
