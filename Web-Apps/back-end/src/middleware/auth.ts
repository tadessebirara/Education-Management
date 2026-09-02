import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

export interface AuthRequest extends Request {
  user?: any;
  userId?: number;
  userRole?: string;
  userPermissions?: string[];
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required. Please provide a valid token.",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (jwtError) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired token. Please login again.",
      });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token structure. Please login again.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        status: "error",
        message: "Account is deactivated. Please contact administrator.",
      });
    }

    req.user = user;
    req.userId = user.id;
    req.userRole = user.role?.name || "student";

    next();
  } catch (error) {
    console.error("Auth error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token. Please login again.",
      });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: "error",
        message: "Token expired. Please login again.",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Authentication failed. Please try again.",
    });
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required.",
      });
    }

    if (!allowedRoles.includes(req.userRole!)) {
      return res.status(403).json({
        status: "error",
        message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
      });
    }

    next();
  };
};
