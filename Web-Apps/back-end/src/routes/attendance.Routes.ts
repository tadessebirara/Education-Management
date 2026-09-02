import express from "express";
import { AttendanceController } from "../controllers/attendance.Controller.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Attendance management
router.post(
  "/record",
  authorize("instructor", "admin"),
  AttendanceController.recordAttendance,
);
router.get("/", AttendanceController.getAttendance);
router.get("/stats", AttendanceController.getAttendanceStats);
router.get(
  "/low-attendance",
  authorize("admin", "registrar"),
  AttendanceController.getLowAttendanceStudents,
);

export default router;
