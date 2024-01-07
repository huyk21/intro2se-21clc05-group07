import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
// "/" is the same as "/api/users"
// "/logout" is the same as "/api/users/logout"
// the post logout dont need route because is a post reques, but why profile need route? because is a get request?

// Định nghĩa các route cho API của đơn hàng
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);// Route để thêm đơn hàng mới,Route để lấy danh sách đơn hàng (chỉ admin)
router.route("/myorders").get(protect, getMyOrders);// Route để lấy danh sách đơn hàng của người dùng đăng nhập
router.route("/:id").get(protect, getOrderById);// Route để xem chi tiết một đơn hàng dựa trên ID đơn hàng
router.route("/:id/pay").put(protect, updateOrderToPaid);// Route để cập nhật trạng thái thanh toán của một đơn hàng dựa trên ID đơn hàng
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);// Route để cập nhật trạng thái giao hàng của một đơn hàng dựa trên ID đơn hàng
export default router;
