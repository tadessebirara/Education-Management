import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { prisma } from "../index.js";
import { AuthRequest } from "../middleware/auth.js";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email and password are required.",
        });
      }

      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          role: true,
          student: true,
          instructor: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Invalid credentials.",
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          status: "error",
          message: "Account deactivated. Contact administrator.",
        });
      }

      const isValid = await argon2.verify(user.passwordHash, password);
      if (!isValid) {
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "LOGIN_FAILED",
            resourceType: "auth",
            ipAddress: req.ip || "unknown",
            userAgent: req.headers["user-agent"] || "unknown",
            changes: { email, reason: "Invalid password" },
          },
        });
        return res.status(401).json({
          status: "error",
          message: "Invalid credentials.",
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role?.name || "student",
        },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRE || "7d" },
      );

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "LOGIN_SUCCESS",
          resourceType: "auth",
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
          changes: { email },
        },
      });

      const { passwordHash, ...userWithoutPassword } = user;

      return res.status(200).json({
        status: "success",
        data: {
          token,
          user: userWithoutPassword,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        status: "error",
        message: "Login failed. Please try again.",
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { username, email, password, firstName, lastName, phone, roleId } =
        req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Username, email, and password are required.",
        });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "User with this email or username already exists.",
        });
      }

      const passwordHash = await argon2.hash(password);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
          firstName,
          lastName,
          phone,
          roleId: roleId || 5,
          isActive: true,
        },
        include: {
          role: true,
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "USER_REGISTERED",
          resourceType: "user",
          resourceId: user.id,
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
          changes: { email, username },
        },
      });

      const { passwordHash: _, ...userWithoutPassword } = user;

      return res.status(201).json({
        status: "success",
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({
        status: "error",
        message: "Registration failed. Please try again.",
      });
    }
  }

  static async logout(req: AuthRequest, res: Response) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: req.userId!,
          action: "LOGOUT",
          resourceType: "auth",
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Logged out successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({
        status: "error",
        message: "Logout failed.",
      });
    }
  }

  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: {
          role: true,
          student: true,
          instructor: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found.",
        });
      }

      const { passwordHash, ...userWithoutPassword } = user;

      return res.status(200).json({
        status: "success",
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch profile.",
      });
    }
  }

  static async changePassword(req: AuthRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          status: "error",
          message: "Current password and new password are required.",
        });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          status: "error",
          message: "New password must be at least 8 characters long.",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.userId },
      });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found.",
        });
      }

      const isValid = await argon2.verify(user.passwordHash, currentPassword);
      if (!isValid) {
        return res.status(401).json({
          status: "error",
          message: "Current password is incorrect.",
        });
      }

      const passwordHash = await argon2.hash(newPassword);

      await prisma.user.update({
        where: { id: req.userId },
        data: {
          passwordHash,
          passwordChangedAt: new Date(),
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: req.userId!,
          action: "PASSWORD_CHANGED",
          resourceType: "user",
          resourceId: req.userId,
          ipAddress: req.ip || "unknown",
          userAgent: req.headers["user-agent"] || "unknown",
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Password changed successfully.",
      });
    } catch (error) {
      console.error("Change password error:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to change password.",
      });
    }
  }
}
