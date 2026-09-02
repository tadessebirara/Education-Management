import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Routes - Remove .js extensions
import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/student.routes.js";
// import instructorRoutes from "./routes/instructorRoutes";
// import courseRoutes from "./routes/courseRoutes";
// import sectionRoutes from "./routes/sectionRoutes";
// import enrollmentRoutes from "./routes/enrollmentRoutes";
import attendanceRoutes from "./routes/attendance.Routes.js";
/*
import assessmentRoutes from "./routes/assessmentRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import feeRoutes from "./routes/feeRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import timetableRoutes from "./routes/timetableRoutes";
import announcementRoutes from "./routes/announcementRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import auditRoutes from "./routes/auditRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import reportRoutes from "./routes/reportRoutes";*/

dotenv.config();

const app = express();
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
// app.use("/api/instructors", instructorRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/sections", sectionRoutes);
// app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/attendance", attendanceRoutes);

// Temporarily disabled routes until their modules are implemented/imported.
// app.use("/api/assessments", assessmentRoutes);
// app.use("/api/grades", gradeRoutes);
// app.use("/api/fees", feeRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/timetables", timetableRoutes);
// app.use("/api/announcements", announcementRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/audit-logs", auditRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/reports", reportRoutes);

// Error Handling Middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error:", err);

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
      status: "error",
      message: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  },
);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 EMS Backend running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});

// Graceful Shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing server...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing server...");
  await prisma.$disconnect();
  process.exit(0);
});
