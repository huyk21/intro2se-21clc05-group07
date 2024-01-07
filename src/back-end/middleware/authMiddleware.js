import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
// Protected routes are routes that can only be accessed by logged in users. We will use a middleware to protect our routes.
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  //REad the jwt token from the header
  token = req.cookies.jwt;
  if (token) {
    try {
    // Verify and decode the JWT token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //this wil return the decoded token
      // Fetch the user associated with the decoded user ID and exclude the password field
      req.user = await User.findById(decoded.userId).select("-password");
      // Continue to the next middleware if verification is successful
      next(); //what if decoded is not valid? we will catch the error in the catch block
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//admin middle warre
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401); //unauthorized
    throw new Error("Not authorized as an admin");
  }
};

export { admin };
