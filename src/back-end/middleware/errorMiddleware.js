// Middleware xử lý khi không tìm thấy tài nguyên
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set the status code to 404
  next(error); // Pass the error to the next middleware
};
// Middleware xử lý lỗi chung
const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 if not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  //Check for Mongoose CastError

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
export { notFound, errorHandler };
