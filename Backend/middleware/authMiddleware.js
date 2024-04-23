const jwt = require("jsonwebtoken");
const User = require("../models/auth/UserModel.js");
const asyncHandler =  require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  try {
    // check if user logged in
    
    const token = req.cookies.token;
    console.log("TOKEN " + token)
    if (!token) {
      res.status(401).json({ message: "Not authorized, please login!" });
    }
    //get user details from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    
    // set user details in the req object
    req.user = user;
    console.log(req.user)
    console.log("USER " + user)
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Not authorized, token failed!" });
  }
});

