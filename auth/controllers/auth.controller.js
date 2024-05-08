import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateJWTTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.status(201).json({ message: "Username already exists" });
    } else {
      const user = new User({
        username: username,
        password: hashedPassword,
        name,
      });
      console.log(user);

      await user.save();

      generateJWTTokenAndSetCookie(user._id, res);

      res.status(201).json({
        status: "success",
        message: "User Registration Successful",
        data: { _id: user._id, username: user.username, name: user.name },
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "User Registration failed",
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({
        status: "error",
        message: "Auth failed. User not found",
        data: {},
      });

    const passwordMatch = await bcrypt.compare(password, user?.password || "");
    if (!passwordMatch)
      return res.status(401).json({
        status: "error",
        message: "Auth failed. Password mismatch",
        data: {},
      });

    generateJWTTokenAndSetCookie(user._id, res);
    res.status(200).json({
      status: "success",
      message: "User login successful",
      data: { _id: user._id, username: user.username, name: user.name },
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", message: "Login failed", data: {} });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
    data: {},
  });
};

const getUser = async (req, res) => {
  try {
    if (!req.headers.user) {
      return res
        .status(500)
        .json({ status: "error", message: "Unauthorized", data: {} });
    }

    const { userId } = JSON.parse(req.headers.user);
    const user = await User.findById({ _id: userId });

    user.password = undefined;

    res.status(200).json({
      status: "success",
      message: "Authorized",
      data: { user },
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", message: "Unauthorized", data: {} });
  }
};

export { signup, login, logout, getUser };
