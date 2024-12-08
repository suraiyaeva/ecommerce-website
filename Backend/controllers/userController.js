import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ sucess: false, message: "All fields are required" });
    }
    //checking user email already exist or not?
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ sucess: false, message: "email already exist" });
    }

    //encrypting user password
    const hashedPassword = await encryptPassword(password);
    //creating new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .send({ sucess: true, message: "user registration successful" });
  } catch (error) {
    console.log(`register controller error ${error}`);
    res
      .status(400)
      .send({ success: false, message: "Error in register controller", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res
        .status(400)
        .send({ sucess: false, message: "All fields are required" });
    }
    //check user email is present in database or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ sucess: false, message: "email is not registered" });
    }
    //matching password
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect email or password" });
    }
    //generating token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
    //remove password field to send user data from backend to frontend
    user.password = undefined;
    //return success response
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({ success: true, message: "login successful", user, token });
  } catch (error) {
    console.log(`logincontroller error ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "Error in login controller", error });
  }
};

const logoutController = async (req, res) => {
  return res
    .cookie("token", "", { httpOnly: true, secure: true }) //to remove cookies from browser cookies
    .status(200)
    .send({
      success: true,
      message: "logout successful",
      expires: new Date(0),
    });
};

const allUsersController = async (req, res) => {
  try {
    //find all users in database
    const users = await userModel.find({}).select("-password");
    if (!users) {
      return res.status(404).send({ sucess: false, message: "No user found" });
    }

    return res.status(200).send({ success: true, total: users.length, users });
  } catch (error) {
    console.log(`allUserscontroller error ${error}`);
    res
      .status(400)
      .send({ success: false, message: "Error in login controller", error });
  }
};

export {
  registerController,
  loginController,
  logoutController,
  allUsersController,
};
