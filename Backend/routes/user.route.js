import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  updateProfile,
  uploadResume,
  verifyEmail,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);

router.route("/uploadResume").post(authenticateToken, singleUpload, uploadResume);

export default router;
