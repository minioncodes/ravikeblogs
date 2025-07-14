import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/user.schema.js";

dotenv.config();
export const usignup = async function (req, res) {
  try {
    const { username, password, email, fullname } = req.body;
    console.log("req body = ", req.body);
    const isuser = await UserModel.findOne({ email });
    if (isuser) {
      return res.status(400).json({
        msg: "already in the building",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new UserModel({
      username,
      password: hashedPassword,
      email,
      fullname,
    });
    await newuser.save();
    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const expiry_date = new Date(Date.now() + 30 * 60 * 1000);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiry_date,
      })
      .status(200)
      .json({
        msg: "User logged in successfully",
        user: newuser,
        token,
        email: email,
      });
  } catch (e) {
    console.log("errors in the building = ", e.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
export const usignin = async function (req, res) {
  try {
    const { email, password } = req.body;
    const isValidUser = await UserModel.findOne({ email });
    if (!isValidUser) {
      return res.status(404).json({ msg: "Invalid username" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isValidUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ msg: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: isValidUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1800s" }
    );
    const { password: hashedPassword, ...userData } = isValidUser._doc;
    const expiry_date = new Date(Date.now() + 30 * 60 * 1000);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiry_date,
        user: isValidUser,
      })
      .status(200)
      .json({
        msg: "User logged in successfully",
        token,
        email: isValidUser.email,
      });
  } catch (error) {
    console.error("Error in logging in:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const changePassword = async function (req, res) {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;
    console.log("userId = ", userId);
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "old password is incorrect" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "new password and confirm password does not match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changing password:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
