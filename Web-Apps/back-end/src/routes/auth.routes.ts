import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

// Protected routes
router.post("/logout", authenticate, AuthController.logout);
router.get("/profile", authenticate, AuthController.getProfile);
router.post("/change-password", authenticate, AuthController.changePassword);

export default router;
