import { Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
import { prisma } from "../index.js";
import argon2 from "argon2";

export class StudentController {
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const { page = 1, limit = 10, search, programId, status } = req.query;

      const where: any = {};
      if (search) {
        where.OR = [
          { studentId: { contains: search as string, mode: "insensitive" } },
          {
            user: {
              firstName: { contains: search as string, mode: "insensitive" },
            },
          },
          {
            user: {
              lastName: { contains: search as string, mode: "insensitive" },
            },
          },
          {
            user: {
              email: { contains: search as string, mode: "insensitive" },
            },
          },
        ];
      }
      if (programId) where.programId = parseInt(programId as string);
      if (status) where.enrollmentStatus = status as string;

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const [students, total] = await Promise.all([
        prisma.student.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
            program: {
              include: {
                department: true,
              },
            },
          },
          skip,
          take: parseInt(limit as string),
          orderBy: { createdAt: "desc" },
        }),
        prisma.student.count({ where }),
      ]);

      return res.status(200).json({
        status: "success",
        data: {
          students,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string)),
          },
        },
      });
    } catch (error) {
      console.error("Get students error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch students.",
      });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              isActive: true,
            },
          },
          program: {
            include: {
              department: true,
            },
          },
          enrollments: {
            include: {
              section: {
                include: {
                  course: true,
                  semester: true,
                },
              },
            },
          },
          attendanceRecords: {
            orderBy: { date: "desc" },
            take: 10,
          },
          grades: {
            include: {
              assessment: true,
            },
          },
          feeRecords: {
            include: {
              payments: true,
              semester: true,
            },
          },
        },
      });

      if (!student) {
        return res.status(404).json({
          status: "error",
          message: "Student not found.",
        });
      }

      return res.status(200).json({
        status: "success",
        data: student,
      });
    } catch (error) {
      console.error("Get student error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch student.",
      });
    }
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const {
        userData,
        studentId,
        dateOfBirth,
        gender,
        guardianName,
        guardianPhone,
        address,
        programId,
        currentAcademicYear,
      } = req.body;

      if (!userData?.email || !userData?.firstName || !userData?.lastName) {
        return res.status(400).json({
          status: "error",
          message: "User email, first name, and last name are required.",
        });
      }

      const existingStudent = await prisma.student.findUnique({
        where: { studentId },
      });

      if (existingStudent) {
        return res.status(400).json({
          status: "error",
          message: "Student with this ID already exists.",
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "User with this email already exists.",
        });
      }

      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            username: userData.email,
            email: userData.email,
            passwordHash: await argon2.hash("temp123"),
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone || null,
            roleId: 5,
            isActive: true,
          },
        });

        const student = await tx.student.create({
          data: {
            userId: user.id,
            studentId,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            gender: gender || null,
            guardianName: guardianName || null,
            guardianPhone: guardianPhone || null,
            address: address || null,
            programId: programId ? parseInt(programId) : null,
            currentAcademicYear: currentAcademicYear || null,
            enrollmentStatus: "active",
            registrationDate: new Date(),
          },
          include: {
            user: true,
            program: {
              include: {
                department: true,
              },
            },
          },
        });

        return student;
      });

      await prisma.auditLog.create({
        data: {
          userId: req.userId!,
          action: "STUDENT_CREATED",
          resourceType: "student",
          resourceId: result.id,
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
          changes: { studentId, programId },
        },
      });

      return res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.error("Create student error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to create student.",
      });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const {
        studentId,
        dateOfBirth,
        gender,
        guardianName,
        guardianPhone,
        address,
        programId,
        currentAcademicYear,
        enrollmentStatus,
        userData,
      } = req.body;

      const existingStudent = await prisma.student.findUnique({
        where: { id: parseInt(id) },
        include: { user: true },
      });

      if (!existingStudent) {
        return res.status(404).json({
          status: "error",
          message: "Student not found.",
        });
      }

      const result = await prisma.$transaction(async (tx) => {
        const student = await tx.student.update({
          where: { id: parseInt(id) },
          data: {
            studentId: studentId || existingStudent.studentId,
            dateOfBirth: dateOfBirth
              ? new Date(dateOfBirth)
              : existingStudent.dateOfBirth,
            gender: gender || existingStudent.gender,
            guardianName: guardianName || existingStudent.guardianName,
            guardianPhone: guardianPhone || existingStudent.guardianPhone,
            address: address || existingStudent.address,
            programId: programId
              ? parseInt(programId)
              : existingStudent.programId,
            currentAcademicYear:
              currentAcademicYear || existingStudent.currentAcademicYear,
            enrollmentStatus:
              enrollmentStatus || existingStudent.enrollmentStatus,
          },
          include: {
            user: true,
            program: {
              include: {
                department: true,
              },
            },
          },
        });

        if (userData) {
          await tx.user.update({
            where: { id: existingStudent.userId },
            data: {
              firstName: userData.firstName || existingStudent.user.firstName,
              lastName: userData.lastName || existingStudent.user.lastName,
              phone: userData.phone || existingStudent.user.phone,
              email: userData.email || existingStudent.user.email,
            },
          });
        }

        return student;
      });

      await prisma.auditLog.create({
        data: {
          userId: req.userId!,
          action: "STUDENT_UPDATED",
          resourceType: "student",
          resourceId: parseInt(id),
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
          changes: { studentId, programId, enrollmentStatus },
        },
      });

      return res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.error("Update student error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to update student.",
      });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
        include: { user: true },
      });

      if (!student) {
        return res.status(404).json({
          status: "error",
          message: "Student not found.",
        });
      }

      await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: student.userId },
          data: { isActive: false },
        });

        await tx.student.update({
          where: { id: parseInt(id) },
          data: { enrollmentStatus: "suspended" },
        });
      });

      await prisma.auditLog.create({
        data: {
          userId: req.userId!,
          action: "STUDENT_DELETED",
          resourceType: "student",
          resourceId: parseInt(id),
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
          changes: { studentId: student.studentId },
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Student deactivated successfully.",
      });
    } catch (error) {
      console.error("Delete student error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to delete student.",
      });
    }
  }

  static async getAttendanceSummary(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { semesterId } = req.query;

      const where: any = { studentId: parseInt(id) };
      if (semesterId) {
        where.section = { semesterId: parseInt(semesterId as string) };
      }

      const attendance = await prisma.attendance.findMany({
        where,
        include: {
          section: {
            include: {
              course: true,
              semester: true,
            },
          },
        },
        orderBy: { date: "asc" },
      });

      const total = attendance.length;
      const present = attendance.filter((a) => a.status === "Present").length;
      const absent = attendance.filter((a) => a.status === "Absent").length;
      const late = attendance.filter((a) => a.status === "Late").length;
      const excused = attendance.filter((a) => a.status === "Excused").length;

      const percentage = total > 0 ? ((present + late) / total) * 100 : 0;

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
          records: attendance,
        },
      });
    } catch (error) {
      console.error("Get attendance summary error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch attendance summary.",
      });
    }
  }

  static async getGradeSummary(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { semesterId } = req.query;

      const where: any = { studentId: parseInt(id) };
      if (semesterId) {
        where.section = { semesterId: parseInt(semesterId as string) };
      }

      const grades = await prisma.grade.findMany({
        where,
        include: {
          assessment: {
            include: {
              section: {
                include: {
                  course: true,
                  semester: true,
                },
              },
            },
          },
          enrollment: true,
        },
        orderBy: {
          assessment: { section: { semester: { startDate: "desc" } } },
        },
      });

      const publishedGrades = grades.filter((g) => g.isPublished);
      const totalCredits = publishedGrades.reduce(
        (sum, g) => sum + (g.assessment?.section?.course?.creditHours || 0),
        0,
      );

      const totalPoints = publishedGrades.reduce(
        (sum, g) =>
          sum +
          (g.gradePoint || 0) *
            (g.assessment?.section?.course?.creditHours || 0),
        0,
      );

      const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

      return res.status(200).json({
        status: "success",
        data: {
          summary: {
            totalCourses: publishedGrades.length,
            gpa: Math.round(gpa * 100) / 100,
            totalCredits,
          },
          grades: publishedGrades,
        },
      });
    } catch (error) {
      console.error("Get grade summary error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch grade summary.",
      });
    }
  }
}
