import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //set JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, //this will prevent the cookie to be accessed by javascript, prevent XSS attacks
    secure: process.env.NODE_ENV !== "development", //this will make sure the cookie is only sent on HTTPS in production
    sameSite: "strict", //this will prevent the cookie to be sent with cross-site requests, prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
};
export default generateToken;
