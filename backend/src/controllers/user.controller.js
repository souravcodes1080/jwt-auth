import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import sendMail, {sendWelcomeMail} from "../utils/nodemailerConfig.js";
import otpGenerator from "otp-generator";
import { genToken, verifyToken } from "../utils/jwtConfig.js";
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists." });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please make a strong password.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = otpGenerator.generate(5, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      otp: otp,
    });
    if (newUser) {
      await sendMail(email, otp);

      return res.json({
        success: true,
        message: "User registered successfully.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error while registering user.",
    });
  }
};
const verifyEmail = async (req, res) => {
  try {
    //TODO: we can take email from header instead of body!
    const { email, otp } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "No user found." });
    }
    if (otp === existingUser.otp) {
      await User.findOneAndUpdate({ email }, { isVerified: true });
      sendWelcomeMail(email, existingUser.username)
      return res.json({
        success: true,
        message: "User verified.",
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect Otp.",
      });
    }
  } catch (error) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error while veryfying email.",
    });
  }
};
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = otpGenerator.generate(5, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const user = await User.findOneAndUpdate({ email }, { otp: otp });
    await sendMail(email, otp);

    if(user){
      return res.json({
        success: true,
        message: "Otp sent.",
      });
    }
  } catch (error) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error resending otp.",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "No user found." });
    }
    if(!existingUser.isVerified){
      return res.json({ success: false, message: "User not verified." });
    }
    const validUser = await bcrypt.compare(password, existingUser.password);
    if (validUser) {
      //   const token = jwt.sign(
      //     { id: existingUser._id },
      //     process.env.JWT_SECRET_KEY,
      //     { expiresIn: 3600 }
      //   );
      const token = genToken(existingUser._id, 8760);
      return res.json({
        success: true,
        message: "Login sucessfull.",
        username: existingUser.username,
        email : existingUser.email,
        token: token
      });
    } else {
      return res.json({ success: false, message: "Incorrect Password." });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error while logging in." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const verifiedUser = verifyToken(token);

    if (verifiedUser) {
      const users = await User.find();
      return res.json({
        success: true,
        message: "Data fetched!",
        users: users,
      });
    } else {
      return res.json({
        success: false,
        message: "Unauthorized access denied.",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: "Unauthorized access denied." });
  }
};

export { register, verifyEmail, resendOtp, login, getAllUsers };
