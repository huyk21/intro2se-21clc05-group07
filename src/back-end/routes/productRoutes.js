import express from "express";
const router = express.Router();
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteOneProduct,
  createReviewOfProduct,
  getAllProducts,
  getTopRatedProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectIdValid from "../middleware/checkObjectId.js";
router.route("/").get(getAllProducts).post(protect, admin, createProduct);
// Định nghĩa route cho việc tạo đánh giá sản phẩm
router
  .route("/:id/reviews")
  .post(protect, checkObjectIdValid, createReviewOfProduct);
  // Định nghĩa route cho việc lấy danh sách sản phẩm có đánh giá cao nhất
router.get("/top", getTopRatedProducts);
// Định nghĩa route cho các thao tác CRUD trên sản phẩm
router
  .route("/:id")
  .get(checkObjectIdValid, getProductById)
  .put(protect, admin, checkObjectIdValid, updateProduct)
  .delete(protect, admin, checkObjectIdValid, deleteOneProduct);
export default router;
