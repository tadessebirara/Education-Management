import express from "express";
import { StudentController } from "../controllers/student.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Student management
router.get("/", authorize("admin", "registrar"), StudentController.getAll);
router.get("/:id", StudentController.getById);
router.post("/", authorize("admin", "registrar"), StudentController.create);
router.put("/:id", authorize("admin", "registrar"), StudentController.update);
router.delete("/:id", authorize("admin"), StudentController.delete);

// Student academic records
router.get("/:id/attendance", StudentController.getAttendanceSummary);
router.get("/:id/grades", StudentController.getGradeSummary);

export default router;
