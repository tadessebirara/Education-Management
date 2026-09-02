import { Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
import { prisma } from "../index.js";

export class AttendanceController {
  static async recordAttendance(req: AuthRequest, res: Response) {
    try {
      const { sectionId, date, records } = req.body;

      if (!sectionId || !date || !records || !Array.isArray(records)) {
        return res.status(400).json({
          status: "error",
          message: "Section ID, date, and attendance records are required.",
        });
      }

      const section = await prisma.section.findUnique({
        where: { id: parseInt(sectionId) },
        include: { course: true },
      });

      if (!section) {
        return res.status(404).json({
          status: "error",
          message: "Section not found.",
        });
      }

      if (section.instructorId !== req.userId && req.userRole !== "admin") {
        return res.status(403).json({
          status: "error",
          message: "You are not assigned to this section.",
        });
      }

      const results = await prisma.$transaction(async (tx) => {
        const attendanceRecords = [];

        for (const record of records) {
          const { studentId, status, notes } = record;

          if (!["Present", "Absent", "Late", "Excused"].includes(status)) {
            throw new Error(`Invalid status: ${status}`);
          }

          const existing = await tx.attendance.findFirst({
            where: {
              studentId: parseInt(studentId),
              sectionId: parseInt(sectionId),
              date: new Date(date),
            },
          });

          let attendance;
          if (existing) {
            attendance = await tx.attendance.update({
              where: { id: existing.id },
              data: {
                status,
                notes: notes || existing.notes,
                instructorId: req.userId!,
                submittedAt: new Date(),
              },
            });
          } else {
            attendance = await tx.attendance.create({
              data: {
                studentId: parseInt(studentId),
                sectionId: parseInt(sectionId),
                date: new Date(date),
                status,
                notes: notes || null,
                instructorId: req.userId!,
              },
            });
          }

          attendanceRecords.push(attendance);
        }

        return attendanceRecords;
      });

      await prisma.auditLog.create({
        data: {
          userId: req.userId!,
          action: "ATTENDANCE_RECORDED",
          resourceType: "attendance",
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
          changes: {
            sectionId,
            date,
            recordCount: records.length,
          },
        },
      });

      return res.status(200).json({
        status: "success",
        data: {
          records: results,
          message: `Attendance recorded for ${results.length} students.`,
        },
      });
    } catch (error: any) {
      console.error("Record attendance error:", error);
      return res.status(500).json({
        status: "error",
        message: error.message || "Failed to record attendance.",
      });
    }
  }

  static async getAttendance(req: AuthRequest, res: Response) {
    try {
      const {
        sectionId,
        studentId,
        startDate,
        endDate,
        status,
        page = 1,
        limit = 50,
      } = req.query;

      const where: any = {};

      if (sectionId) where.sectionId = parseInt(sectionId as string);
      if (studentId) where.studentId = parseInt(studentId as string);
      if (status) where.status = status as string;
      if (startDate) where.date = { gte: new Date(startDate as string) };
      if (endDate) {
        where.date = {
          ...(where.date || {}),
          lte: new Date(endDate as string),
        };
      }

      if (req.userRole === "instructor") {
        const sections = await prisma.section.findMany({
          where: { instructorId: req.userId },
          select: { id: true },
        });
        const sectionIds = sections.map((s) => s.id);
        if (sectionIds.length > 0) {
          where.sectionId = { in: sectionIds };
        } else {
          return res.status(200).json({
            status: "success",
            data: { records: [], pagination: { total: 0 } },
          });
        }
      }

      if (req.userRole === "student") {
        const student = await prisma.student.findUnique({
          where: { userId: req.userId },
        });
        if (!student) {
          return res.status(404).json({
            status: "error",
            message: "Student profile not found.",
          });
        }
        where.studentId = student.id;
      }

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const [records, total] = await Promise.all([
        prisma.attendance.findMany({
          where,
          include: {
            student: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                  },
                },
              },
            },
            section: {
              include: {
                course: true,
                semester: true,
              },
            },
          },
          skip,
          take: parseInt(limit as string),
          orderBy: { date: "desc" },
        }),
        prisma.attendance.count({ where }),
      ]);

      return res.status(200).json({
        status: "success",
        data: {
          records,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string)),
          },
        },
      });
    } catch (error) {
      console.error("Get attendance error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch attendance records.",
      });
    }
  }

  static async getAttendanceStats(req: AuthRequest, res: Response) {
    try {
      const { sectionId, studentId, semesterId } = req.query;

      const where: any = {};
      if (sectionId) where.sectionId = parseInt(sectionId as string);
      if (studentId) where.studentId = parseInt(studentId as string);
      if (semesterId) {
        where.section = { semesterId: parseInt(semesterId as string) };
      }

      if (req.userRole === "student") {
        const student = await prisma.student.findUnique({
          where: { userId: req.userId },
        });
        if (!student) {
          return res.status(404).json({
            status: "error",
            message: "Student profile not found.",
          });
        }
        where.studentId = student.id;
      }

      const records = await prisma.attendance.findMany({
        where,
        include: {
          section: {
            include: {
              course: true,
            },
          },
        },
      });

      const total = records.length;
      const present = records.filter((r) => r.status === "Present").length;
      const absent = records.filter((r) => r.status === "Absent").length;
      const late = records.filter((r) => r.status === "Late").length;
      const excused = records.filter((r) => r.status === "Excused").length;

      const percentage = total > 0 ? ((present + late) / total) * 100 : 0;

      const byCourse = records.reduce((acc: any, r) => {
        const courseName = r.section.course.name;
        if (!acc[courseName]) {
          acc[courseName] = {
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
            excused: 0,
          };
        }
        acc[courseName].total++;
        acc[courseName][r.status.toLowerCase()]++;
        return acc;
      }, {});

      return res.status(200).json({
        status: "success",
        data: {
          summary: {
            total,
            present,
            absent,
            late,
            excused,
            percentage: Math.round(percentage * 100) / 100,
          },
          byCourse,
          records,
        },
      });
    } catch (error) {
      console.error("Get attendance stats error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch attendance statistics.",
      });
    }
  }

  static async getLowAttendanceStudents(req: AuthRequest, res: Response) {
    try {
      const { threshold = 75, semesterId } = req.query;

      const students = await prisma.student.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          attendanceRecords: {
            where: semesterId
              ? {
                  section: { semesterId: parseInt(semesterId as string) },
                }
              : undefined,
          },
        },
      });

      const lowAttendance = students
        .map((student) => {
          const records = student.attendanceRecords;
          const total = records.length;
          if (total === 0) return null;

          const present = records.filter((r) => r.status === "Present").length;
          const late = records.filter((r) => r.status === "Late").length;
          const percentage = ((present + late) / total) * 100;

          return {
            studentId: student.studentId,
            name: `${student.user.firstName} ${student.user.lastName}`,
            email: student.user.email,
            total,
            present,
            absent: records.filter((r) => r.status === "Absent").length,
            late,
            excused: records.filter((r) => r.status === "Excused").length,
            percentage: Math.round(percentage * 100) / 100,
          };
        })
        .filter(
          (s) => s !== null && s.percentage < parseFloat(threshold as string),
        )
        .sort((a, b) => a!.percentage - b!.percentage);

      return res.status(200).json({
        status: "success",
        data: {
          threshold: parseFloat(threshold as string),
          students: lowAttendance,
          total: lowAttendance.length,
        },
      });
    } catch (error) {
      console.error("Get low attendance error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch low attendance students.",
      });
    }
  }
}
