import userModel from "../models/User";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// generate jwt token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// check if user is admin
const getAdminStatus = (email) => {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  return adminEmails.includes(email.toLowerCase());
};

// user registration
// POST :- /api/user/register

export const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter valid email" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    //   Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   adding new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    const userData = user.toObject();
    delete userData.password;

    userData.isAdmin = getAdminStatus(userData.email);

    res.status(201).json({ user: userData, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// user login
// GET :-  /api/user/login

export const loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email.trim().toLowerCase();

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    //   find user
    const user = await userModel.findOne({ email }).populate("addresses");

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    const userData = user.toObject();
    delete userData.password;

    userData.isAdmin = getAdminStatus(userData.email);

    res.status(201).json({
      user: userData,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
