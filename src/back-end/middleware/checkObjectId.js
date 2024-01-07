import { isValidObjectId } from "mongoose";
// Middleware kiểm tra ObjectId hợp lệ
function checkObjectIdValid(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectIdValid;
