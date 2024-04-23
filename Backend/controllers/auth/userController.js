const asyncHandler = require("express-async-handler");
const User = require("../../models/auth/UserModel.js");
const generateToken = require("../../helpers/generateToken.js");
const bcrypt = require("bcrypt");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  //check password
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const userExists = await User.findOne({ email });
  //console.log(userExists);
  if (userExists) {
    // bad request
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  //generating token with id
  const token = generateToken(user._id);
  console.log("Teoken " + token);
  //send back the user and token in the response to the client
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 60 * 1000, //30 days
    sameSite: true,
    secure: true,
  });

  if (user) {
    const { _id, name, email, role, photo, bio, isVerified } = user;

    // 201 Created
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  //get email and password from req.bofy
  const { email, password } = req.body;

  //validations

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res.status(404).json({ message: "User not found, sign up!" });
  }

  //chceck if the password match the hashed password
  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  //generate token with id
  const token = generateToken(userExists._id);

  if (userExists && isMatch) {
    const { _id, name, email, role, photo, bio, isVerified } = userExists;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 60 * 1000, //30 days
      sameSite: true,
      secure: true,
    });
    // send back thes user and token in the res to the client
    res.status(200).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

//logout user

exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ message: "User logged out" });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  // get user details from the token ----> protect middleware
  const user = await User.findById(req.user._id);

  if (user) {
    // user properties to update
    const { name, bio, photo } = req.body;
    // update user properties
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.photo = req.body.photo || user.photo;

    const updated = await user.save();

    res.status(200).json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      photo: updated.photo,
      bio: updated.bio,
      isVerified: updated.isVerified,
    });
  } else {
    // 404 Not Found
    res.status(404).json({ message: "User not found" });
  }
});
