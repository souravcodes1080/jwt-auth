import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
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
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (newUser) {
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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "No user found." });
    }
    const validUser = await bcrypt.compare(password, existingUser.password);
    if (validUser) {
    //   const token = jwt.sign(
    //     { id: existingUser._id },
    //     process.env.JWT_SECRET_KEY,
    //     { expiresIn: 3600 }
    //   );
    const token = genToken(existingUser._id, 3600)
      return res.json({
        success: true,
        message: "Login sucessfull.",
        token: token,
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

export { register, login, getAllUsers };
