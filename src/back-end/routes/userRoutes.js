import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserByID,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
// "/" is the same as "/api/users"
// "/logout" is the same as "/api/users/logout"
// the post logout dont need route because is a post reques, but why profile need route? because is a get request?
router.route("/").post(registerUser).get(protect, admin, getUsers);//// Register a new user and Get all users (admin only
router.post("/logout", logoutUser);// Logout user

router.post("/auth", authUser);// Authenticate user
router
  .route("/profile")
  .get(protect, getUserProfile)// Get user profile
  .put(protect, updateUserProfile); // Update user profile

router
  .route("/:id")
  .delete(protect, admin, deleteUsers)// Delete user by ID (admin only)
  .get(protect, admin, getUserByID) // Get user by ID (admin only)
  .put(protect, admin, updateUser); // Update user by ID (admin only)

export default router;
